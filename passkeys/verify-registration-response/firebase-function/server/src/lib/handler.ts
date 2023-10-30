import { GetUser } from '@firebase-with-passkeys/auth-service-type';
import { LogError } from '@firebase-with-passkeys/logger-type-server';
import { CreateAuthenticator } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { GetChallenge } from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import * as HttpsError from '@firebase-with-passkeys/passkeys-https-error-adapter';
import { logUnknownError } from '@firebase-with-passkeys/passkeys-log-unknown-error';
import { CallableContext } from 'firebase-functions/v1/https';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { verifyRegistrationResponse } from '@firebase-with-passkeys/passkeys-verify-registration-response-use-case';

export const verifyRegistrationResponseHandler =
  (P: GetConfig & LogError & GetUser & GetChallenge & CreateAuthenticator) =>
  async (_data: unknown, context?: CallableContext): Promise<unknown> =>
    await pipe(
      verifyRegistrationResponse(P)(_data, context?.auth?.uid),
      TE.orElseFirstIOK(logUnknownError(P)),
      TE.mapLeft(HttpsError.fromEventOrError),
      TE.foldW(HttpsError.throwHttpsError, T.of),
      (t) => t()
    );
