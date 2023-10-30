import {
  UserHasNoEmail,
  UserNotFound,
  UserUnauthenticated,
} from '@firebase-with-passkeys/passkeys-event-types';
import { HttpsError } from 'firebase-functions/v1/https';
import { absurd } from 'fp-ts/function';

export const fromEventOrError = (
  e: Error | UserUnauthenticated | UserHasNoEmail | UserNotFound
): HttpsError => {
  if (e instanceof UserNotFound) {
    return new HttpsError('failed-precondition', e.message);
  }
  if (e instanceof UserUnauthenticated) {
    return new HttpsError('unauthenticated', e.message);
  }
  if (e instanceof UserHasNoEmail) {
    return new HttpsError('failed-precondition', e.message, e.data);
  }
  if (e instanceof Error) {
    return new HttpsError('internal', 'Internal.');
  }
  absurd(e);
  return new HttpsError('internal', 'Internal.');
};
