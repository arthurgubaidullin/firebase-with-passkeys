import { GetUser } from '@firebase-with-passkeys/auth-service-type';
import {
  GetAuthenticator,
  GetAuthenticators,
  UpdateAuthenticator,
} from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import {
  GetChallenge,
  LogError,
  getChallenge,
} from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import { getAuthenticatorDocument } from '@firebase-with-passkeys/passkeys-get-authenticator-document';
import { getConfig } from '@firebase-with-passkeys/passkeys-get-config';
import { verifyAuthenticationResponse as _verifyAuthenticationResponse } from '@simplewebauthn/server';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { failure } from 'io-ts/PathReporter';
import { RequestData } from './request-data';
import { ResponseData } from './response-data';
import { updateAuthenticatorCounter } from './update-authenticator-counter';

export const UNAUTHENTICATED = 'unauthenticated';

export const FAILED_PRECONDITION = 'failed-precondition';

export const verifyAuthenticationResponse =
  (
    P: GetConfig &
      LogError &
      GetUser &
      GetAuthenticators &
      SetChallenge &
      GetChallenge &
      GetAuthenticator &
      UpdateAuthenticator
  ) =>
  async (
    rawAuthenticationResponseJSON: unknown
  ): Promise<
    E.Either<
      Error | string[] | typeof UNAUTHENTICATED | typeof FAILED_PRECONDITION,
      ResponseData
    >
  > => {
    const _data = pipe(
      rawAuthenticationResponseJSON,
      RequestData.decode,
      E.mapLeft(failure)
    );
    if (E.isLeft(_data)) {
      return _data;
    }
    const data = _data.right;

    const _config = pipe(getConfig(P), (a) => a());
    if (E.isLeft(_config)) {
      const e = _config.left;
      P.error(e.message, e);
      return _config;
    }
    const config = _config.right;

    const [expectedChallenge, _authenticator] = await Promise.all([
      getChallenge(P)(data.id),
      getAuthenticatorDocument(P)(data.id, data.id),
    ]);

    if (O.isNone(expectedChallenge)) {
      return E.left(FAILED_PRECONDITION);
    }

    if (O.isNone(_authenticator)) {
      const e = new Error(`Could not find authenticator ${data.id} for user.`);
      P.error(e.message, e);
      return E.left(FAILED_PRECONDITION);
    }
    const [authenticator, updatedAt] = _authenticator.value;

    let verification;
    try {
      verification = await _verifyAuthenticationResponse({
        response: data,
        expectedChallenge: expectedChallenge.value.challenge,
        expectedOrigin: config.NX_ORIGIN,
        expectedRPID: config.NX_RP_ID,
        authenticator: authenticator,
      });
    } catch (_error) {
      const error = E.toError(_error);
      P.error(error.message, error);
      return E.left(E.toError(error));
    }

    const { verified } = verification;

    const { authenticationInfo } = verification;
    const { newCounter } = authenticationInfo;

    await updateAuthenticatorCounter(P)(
      data.id,
      data.id,
      newCounter,
      updatedAt
    )(authenticator);

    return E.right(ResponseData.encode({ verified }));
  };
