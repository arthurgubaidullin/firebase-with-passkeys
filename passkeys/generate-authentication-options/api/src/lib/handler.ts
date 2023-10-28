import { GetAuthenticators } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { PublicKeyCredentialRequestOptionsJSON as _PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/typescript-types';
import { CallableContext, HttpsError } from 'firebase-functions/v1/https';
import * as E from 'fp-ts/Either';
import {
  UNAUTHENTICATED,
  generateAuthenticationOptions,
} from './generate-authentication-options';
import { absurd } from 'fp-ts/function';

export const generateAuthenticationOptionsHandler =
  (P: GetAuthenticators & SetChallenge) =>
  async (
    _: unknown,
    context?: CallableContext
  ): Promise<_PublicKeyCredentialRequestOptionsJSON> => {
    const result = await generateAuthenticationOptions(P)(context?.auth);

    if (E.isLeft(result)) {
      if (result.left === UNAUTHENTICATED) {
        throw new HttpsError('unauthenticated', 'Unauthenticated.');
      }
      absurd(result.left);
      throw new HttpsError('internal', 'Internal.');
    }

    return result.right;
  };
