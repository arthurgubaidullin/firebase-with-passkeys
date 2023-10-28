import { GetUser } from '@firebase-with-passkeys/auth-service-type';
import {
  GetAuthenticator,
  GetAuthenticators,
  UpdateAuthenticator,
} from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import {
  GetChallenge,
  LogError,
} from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import { CallableContext, HttpsError } from 'firebase-functions/v1/https';
import * as E from 'fp-ts/Either';
import { absurd } from 'fp-ts/function';
import { RequestData } from './request-data';
import { ResponseData } from './response-data';
import {
  FAILED_PRECONDITION,
  UNAUTHENTICATED,
  verifyAuthenticationResponse,
} from './verify-authentication-response';

export const verifyAuthenticationResponseHandler =
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
    data: RequestData,
    context?: CallableContext
  ): Promise<ResponseData> => {
    const result = await verifyAuthenticationResponse(P)(
      data,
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
