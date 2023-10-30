import { GetUser } from '@firebase-with-passkeys/auth-service-type';
import { GetAuthenticators } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import * as HttpsError from '@firebase-with-passkeys/passkeys-https-error-adapter';
import { logUnknownError } from '@firebase-with-passkeys/passkeys-log-unknown-error';
import { PublicKeyCredentialCreationOptionsJSON as _PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types';
import { CallableContext } from 'firebase-functions/v1/https';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { generateRegistrationOptions } from '@firebase-with-passkeys/passkeys-generate-registration-options-use-case';
import { LogError } from '@firebase-with-passkeys/logger-type-server';

export const generateRegistrationOptionsHandler =
  (P: GetConfig & GetUser & SetChallenge & GetAuthenticators & LogError) =>
  async (
    _: unknown,
    context?: CallableContext
  ): Promise<_PublicKeyCredentialCreationOptionsJSON> =>
    pipe(
      generateRegistrationOptions(P)(context?.auth),
      TE.orElseFirstIOK(logUnknownError(P)),
      TE.mapLeft(HttpsError.fromEventOrError),
      TE.foldW(HttpsError.throwHttpsError, T.of),
      (t) => t()
    );
