import { GetUser } from '@firebase-with-passkeys/auth-service-type';
import { LogError } from '@firebase-with-passkeys/logger-type-server';
import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { CreateAuthenticator } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import {
  ChallengeNotFound,
  GetChallenge,
  InvalidChallenge,
  getChallenge,
} from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import { createAuthenticatorDocument } from '@firebase-with-passkeys/passkeys-create-authenticator-document';
import {
  InvalidInput,
  UserHasNoEmail,
  UserUnauthenticated,
} from '@firebase-with-passkeys/passkeys-event-types';
import { getConfig } from '@firebase-with-passkeys/passkeys-get-config';
import {
  VerifiedRegistrationResponse,
  verifyRegistrationResponse as _verifyRegistrationResponse,
} from '@simplewebauthn/server';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { ResponseData } from './response-data';
import { RequestData } from './request-data';

export const verifyRegistrationResponse =
  (P: GetConfig & LogError & GetUser & GetChallenge & CreateAuthenticator) =>
  (
    rawRegistrationResponseJSON: unknown,
    userId?: string
  ): TE.TaskEither<
    | UserUnauthenticated
    | UserHasNoEmail
    | InvalidChallenge
    | ChallengeNotFound
    | InvalidInput
    | Error,
    ResponseData
  > =>
  async () => {
    const _config = pipe(getConfig(P), (a) => a());
    if (E.isLeft(_config)) {
      const e = _config.left;
      P.error(e.message, e);
      return _config;
    }
    const config = _config.right;

    if (!userId) {
      return E.left(new UserUnauthenticated());
    }

    const _data = pipe(
      rawRegistrationResponseJSON,
      RequestData.decode,
      E.mapLeft(InvalidInput.create)
    );
    if (E.isLeft(_data)) {
      return _data;
    }
    const data = _data.right;

    const [user, expectedChallenge] = await Promise.all([
      P.getUser(userId),
      getChallenge(P)(userId)(),
    ]);

    if (O.isNone(user)) {
      return E.left(new UserUnauthenticated());
    }

    if (!user.value.email) {
      return E.left(new UserHasNoEmail({ userId }));
    }

    if (E.isLeft(expectedChallenge)) {
      return expectedChallenge;
    }

    let verification: VerifiedRegistrationResponse;
    try {
      verification = await _verifyRegistrationResponse({
        response: data,
        expectedChallenge: expectedChallenge.right.challenge,
        expectedOrigin: config.NX_ORIGIN,
        expectedRPID: config.NX_RP_ID,
      });
    } catch (error) {
      return E.left(E.toError(error));
    }

    if (verification.verified && verification.registrationInfo) {
      const { registrationInfo } = verification;
      const {
        credentialPublicKey,
        credentialID,
        counter,
        credentialBackedUp,
        credentialDeviceType,
      } = registrationInfo;

      const newAuthenticator: AuthenticatorDocument = {
        username: user.value.email,
        credentialID,
        credentialPublicKey,
        counter,
        credentialBackedUp,
        credentialDeviceType,
        transports: [],
      };

      await createAuthenticatorDocument(P)(user.value.uid, newAuthenticator);
    }

    return E.right(ResponseData.encode({ verified: verification.verified }));
  };
