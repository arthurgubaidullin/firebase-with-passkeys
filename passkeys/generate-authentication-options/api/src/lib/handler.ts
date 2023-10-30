import { GetUserByEmail } from '@firebase-with-passkeys/auth-service-type';
import { LogError } from '@firebase-with-passkeys/logger-type-server';
import { GetAuthenticators } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import * as HttpsError from '@firebase-with-passkeys/passkeys-https-error-adapter';
import { logUnknownError } from '@firebase-with-passkeys/passkeys-log-unknown-error';
import { PublicKeyCredentialRequestOptionsJSON as _PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/typescript-types';
import { CallableContext } from 'firebase-functions/v1/https';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { generateAuthenticationOptions } from '@firebase-with-passkeys/passkeys-generate-authentication-options-use-case';

export const generateAuthenticationOptionsHandler =
  (P: LogError & GetAuthenticators & SetChallenge & GetUserByEmail) =>
  async (
    _: unknown,
    context?: CallableContext
  ): Promise<_PublicKeyCredentialRequestOptionsJSON> =>
    pipe(
      generateAuthenticationOptions(P)(context?.auth),
      TE.orElseFirstIOK(logUnknownError(P)),
      TE.mapLeft(HttpsError.fromEventOrError),
      TE.foldW(HttpsError.throwHttpsError, T.of),
      (t) => t()
    );
