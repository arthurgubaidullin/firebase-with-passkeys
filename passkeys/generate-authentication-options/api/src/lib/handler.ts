import { GetAuthenticators } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { PublicKeyCredentialRequestOptionsJSON as _PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/typescript-types';
import { CallableContext, HttpsError } from 'firebase-functions/v1/https';
import * as E from 'fp-ts/Either';
import { absurd } from 'fp-ts/function';
import {
  FAILED_PRECONDITION,
  generateAuthenticationOptions,
} from './generate-authentication-options';
import { LogError } from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { GetUserByEmail } from '@firebase-with-passkeys/auth-service-type';

export const generateAuthenticationOptionsHandler =
  (P: LogError & GetAuthenticators & SetChallenge & GetUserByEmail) =>
  async (
    _: unknown,
    context?: CallableContext
  ): Promise<_PublicKeyCredentialRequestOptionsJSON> => {
    const result = await generateAuthenticationOptions(P)(context?.auth);

    if (E.isLeft(result)) {
      if (result.left === FAILED_PRECONDITION) {
        throw new HttpsError('failed-precondition', 'Failed precondition.');
      }
      if (Array.isArray(result.left)) {
        throw new HttpsError('invalid-argument', 'Invalid argument.');
      }
      absurd(result.left);
      throw new HttpsError('internal', 'Internal.');
    }

    return result.right;
  };
