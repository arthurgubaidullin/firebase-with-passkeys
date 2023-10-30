import {
  InvalidChallenge,
  ChallengeNotFound,
} from '@firebase-with-passkeys/passkeys-challenge-get-document';
import {
  InvalidInput,
  UserHasNoEmail,
  UserNotFound,
  UserUnauthenticated,
} from '@firebase-with-passkeys/passkeys-event-types';
import {
  AuthenticatorNotFound,
  InvalidAuthenticator,
} from '@firebase-with-passkeys/passkeys-get-authenticator-document';
import { HttpsError } from 'firebase-functions/v1/https';
import { absurd } from 'fp-ts/function';

export const fromEventOrError = (
  e:
    | Error
    | UserUnauthenticated
    | UserHasNoEmail
    | UserNotFound
    | InvalidChallenge
    | ChallengeNotFound
    | AuthenticatorNotFound
    | InvalidAuthenticator
    | InvalidInput
): HttpsError => {
  if (e instanceof UserNotFound) {
    return new HttpsError('failed-precondition', e.message);
  }
  if (e instanceof InvalidInput) {
    return new HttpsError('failed-precondition', e.message, e.data);
  }
  if (e instanceof UserUnauthenticated) {
    return new HttpsError('unauthenticated', e.message);
  }
  if (e instanceof UserHasNoEmail) {
    return new HttpsError('failed-precondition', e.message, e.data);
  }
  if (
    e instanceof InvalidChallenge ||
    e instanceof ChallengeNotFound ||
    e instanceof AuthenticatorNotFound ||
    e instanceof InvalidAuthenticator
  ) {
    return new HttpsError('failed-precondition', e.message);
  }
  if (e instanceof Error) {
    return new HttpsError('internal', 'Internal.');
  }
  absurd(e);
  return new HttpsError('internal', 'Internal.');
};
