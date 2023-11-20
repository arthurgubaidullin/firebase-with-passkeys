import {
  CreateCustomToken,
  GetUser,
  GetUserByEmail,
} from '@firebase-with-passkeys/auth-service-type';
import { LogError } from '@firebase-with-passkeys/logger-type-server';
import {
  GetAuthenticator,
  GetAuthenticators,
  UpdateAuthenticator,
} from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { GetChallenge } from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import * as HttpsError from '@firebase-with-passkeys/passkeys-https-error-adapter';
import { logUnknownError } from '@firebase-with-passkeys/passkeys-log-unknown-error';
import { verifyAuthenticationResponse } from '@firebase-with-passkeys/passkeys-verify-authentication-response-use-case';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';

export const verifyAuthenticationResponseHandler =
  (
    P: GetConfig &
      LogError &
      GetUser &
      GetAuthenticators &
      SetChallenge &
      GetChallenge &
      GetAuthenticator &
      UpdateAuthenticator &
      GetUserByEmail &
      CreateCustomToken
  ) =>
  async (data: unknown): Promise<unknown> => {
    return pipe(
      verifyAuthenticationResponse(P)(data),
      TE.orElseFirstIOK(logUnknownError(P)),
      TE.mapLeft(HttpsError.fromEventOrError),
      TE.foldW(HttpsError.throwHttpsError, T.of),
      (t) => t()
    );
  };
