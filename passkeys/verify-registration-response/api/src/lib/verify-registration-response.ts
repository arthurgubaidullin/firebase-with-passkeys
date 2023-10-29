import { GetUser } from '@firebase-with-passkeys/auth-service-type';
import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { CreateAuthenticator } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import {
  GetChallenge,
  LogError,
  getChallenge,
} from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import { createAuthenticatorDocument } from '@firebase-with-passkeys/passkeys-create-authenticator-document';
import { getConfig } from '@firebase-with-passkeys/passkeys-get-config';
import { RegistrationResponseJSON } from '@firebase-with-passkeys/passkeys-types';
import {
  VerifiedRegistrationResponse,
  verifyRegistrationResponse as _verifyRegistrationResponse,
} from '@simplewebauthn/server';
import { logger } from 'firebase-functions/v1';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { failure } from 'io-ts/PathReporter';
import { ResponseData } from './Response-data';

export const UNAUTHENTICATED = 'unauthenticated';

export const FAILED_PRECONDITION = 'failed-precondition';

export const verifyRegistrationResponse =
  (P: GetConfig & LogError & GetUser & GetChallenge & CreateAuthenticator) =>
  async (
    rawRegistrationResponseJSON: unknown,
    userId?: string
  ): Promise<
    E.Either<
      typeof UNAUTHENTICATED | typeof FAILED_PRECONDITION | string[] | Error,
      ResponseData
    >
  > => {
    const _config = pipe(getConfig(P), (a) => a());
    if (E.isLeft(_config)) {
      const e = _config.left;
      P.error(e.message, e);
      return _config;
    }
    const config = _config.right;

    if (!userId) {
      return E.left(UNAUTHENTICATED);
    }

    const _data = pipe(
      rawRegistrationResponseJSON,
      RegistrationResponseJSON.decode,
      E.mapLeft(failure)
    );
    if (E.isLeft(_data)) {
      return _data;
    }
    const data = _data.right;

    const [user, expectedChallenge] = await Promise.all([
      P.getUser(userId),
      getChallenge(P)(userId),
    ]);

    if (O.isNone(user)) {
      return E.left(UNAUTHENTICATED);
    }

    if (!user.value.email) {
      return E.left(FAILED_PRECONDITION);
    }

    if (O.isNone(expectedChallenge)) {
      return E.left(FAILED_PRECONDITION);
    }

    let verification: VerifiedRegistrationResponse;
    try {
      verification = await _verifyRegistrationResponse({
        response: data,
        expectedChallenge: expectedChallenge.value.challenge,
        expectedOrigin: config.NX_ORIGIN,
        expectedRPID: config.NX_RP_ID,
      });
    } catch (error) {
      logger.error(error);
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
