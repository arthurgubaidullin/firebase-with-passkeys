import {
  GetUser,
  GetUserByEmail,
} from '@firebase-with-passkeys/auth-service-type';
import { LogError } from '@firebase-with-passkeys/logger-type-server';
import {
  GetAuthenticator,
  GetAuthenticators,
  UpdateAuthenticator,
} from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import {
  ChallengeNotFound,
  GetChallenge,
  InvalidChallenge,
  getChallenge,
} from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import {
  InvalidInput,
  UserNotFound,
} from '@firebase-with-passkeys/passkeys-event-types';
import {
  AuthenticatorNotFound,
  InvalidAuthenticator,
  getAuthenticatorDocument,
} from '@firebase-with-passkeys/passkeys-get-authenticator-document';
import { getConfig } from '@firebase-with-passkeys/passkeys-get-config';
import { updateAuthenticatorCounter } from '@firebase-with-passkeys/passkeys-update-authenticator-counter';
import {
  RequestData,
  ResponseData,
} from '@firebase-with-passkeys/passkeys-verify-authentication-response-contract';
import { verifyAuthenticationResponse as _verifyAuthenticationResponse } from '@simplewebauthn/server';
import * as E from 'fp-ts/Either';
import { TaskEither } from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

export const verifyAuthenticationResponse =
  (
    P: GetConfig &
      LogError &
      GetUser &
      GetAuthenticators &
      SetChallenge &
      GetChallenge &
      GetAuthenticator &
      UpdateAuthenticator &
      GetUserByEmail
  ) =>
  (
    rawAuthenticationResponseJSON: unknown
  ): TaskEither<
    | Error
    | InvalidChallenge
    | ChallengeNotFound
    | AuthenticatorNotFound
    | InvalidAuthenticator
    | InvalidInput
    | UserNotFound,
    ResponseData
  > =>
  async () => {
    const _data = pipe(
      rawAuthenticationResponseJSON,
      RequestData.decode,
      E.mapLeft(InvalidInput.create)
    );
    if (E.isLeft(_data)) {
      return _data;
    }
    const { response, username } = _data.right;

    const u = await P.getUserByEmail(username)();

    if (O.isNone(u)) {
      return E.left(new UserNotFound());
    }

    const _config = pipe(getConfig(P), (a) => a());
    if (E.isLeft(_config)) {
      const e = _config.left;
      P.error(e.message, e);
      return _config;
    }
    const config = _config.right;

    const [expectedChallenge, _authenticator] = await Promise.all([
      getChallenge(P)(u.value.uid)(),
      getAuthenticatorDocument(P)(u.value.uid, response.id)(),
    ]);

    if (E.isLeft(expectedChallenge)) {
      return expectedChallenge;
    }

    if (E.isLeft(_authenticator)) {
      return _authenticator;
    }
    const [authenticator, updatedAt] = _authenticator.right;

    let verification;
    try {
      verification = await _verifyAuthenticationResponse({
        response: response,
        expectedChallenge: expectedChallenge.right.challenge,
        expectedOrigin: config.NX_ORIGIN,
        expectedRPID: config.NX_RP_ID,
        authenticator: authenticator,
      });
    } catch (_error) {
      const error = E.toError(_error);
      P.error(error.message, error);
      return E.left(E.toError(error));
    }

    const {
      verified,
      authenticationInfo: { newCounter },
    } = verification;

    await updateAuthenticatorCounter(P)(
      u.value.uid,
      response.id,
      newCounter,
      updatedAt
    )(authenticator);

    return E.right(ResponseData.encode({ verified }));
  };
