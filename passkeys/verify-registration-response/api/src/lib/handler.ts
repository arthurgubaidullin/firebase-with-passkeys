import { GetUser } from '@firebase-with-passkeys/auth-service-type';
import { CreateAuthenticator } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import {
  GetChallenge,
  LogError,
} from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import { CallableContext, HttpsError } from 'firebase-functions/v1/https';
import * as E from 'fp-ts/Either';
import { absurd } from 'fp-ts/function';
import {
  verifyRegistrationResponse,
  UNAUTHENTICATED,
  FAILED_PRECONDITION,
} from './verify-registration-response';
import { ResponseData } from './Response-data';

export const verifyRegistrationResponseHandler =
  (P: GetConfig & LogError & GetUser & GetChallenge & CreateAuthenticator) =>
  async (_data: unknown, context?: CallableContext): Promise<ResponseData> => {
    const result = await verifyRegistrationResponse(P)(
      _data,
      context?.auth?.uid
    );

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
      if (Array.isArray(result.left)) {
        throw new HttpsError('invalid-argument', 'Invalid argument.');
      }
      absurd(result.left);
      throw new HttpsError('internal', 'Internal.');
    }

    return result.right;
  };
