import { GetUser } from '@firebase-with-passkeys/auth-service-type';
import { GetAuthenticators } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { LogError } from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import { PublicKeyCredentialCreationOptionsJSON as _PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types';
import { CallableContext, HttpsError } from 'firebase-functions/v1/https';
import * as E from 'fp-ts/Either';
import { absurd } from 'fp-ts/function';
import {
  FAILED_PRECONDITION,
  UNAUTHENTICATED,
  generateRegistrationOptions,
} from './generate-registration-options';

export const generateRegistrationOptionsHandler =
  (P: GetConfig & GetUser & SetChallenge & GetAuthenticators & LogError) =>
  async (
    _: unknown,
    context?: CallableContext
  ): Promise<_PublicKeyCredentialCreationOptionsJSON> => {
    const result = await generateRegistrationOptions(P)(context?.auth);

    if (E.isLeft(result)) {
      if (result.left === UNAUTHENTICATED) {
        throw new HttpsError('unauthenticated', 'Unauthenticated.');
      }
      if (result.left === FAILED_PRECONDITION) {
        throw new HttpsError('failed-precondition', 'Failed precondition.');
      }
      if (result.left instanceof Error) {
        throw new HttpsError('internal', 'Internal.');
      }
      absurd(result.left);
      throw new HttpsError('internal', 'Internal.');
    }

    return result.right;
  };
