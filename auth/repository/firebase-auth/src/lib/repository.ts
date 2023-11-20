import { getAuth } from 'firebase-admin/auth';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { AuthRepository } from '@firebase-with-passkeys/auth-repository-type';
import { pipe } from 'fp-ts/function';
import { fromUserRecord } from '@firebase-with-passkeys/auth-user-struct';

export const get = (): AuthRepository => {
  const auth = getAuth();
  return {
    getUser: (userId) =>
      pipe(
        TE.tryCatch(async () => auth.getUser(userId), E.toError),
        TE.map(fromUserRecord)
      ),
    getUserByEmail: (email) =>
      pipe(
        TE.tryCatch(async () => auth.getUserByEmail(email), E.toError),
        TE.map(fromUserRecord)
      ),
    createCustomToken: (userId) =>
      pipe(TE.tryCatch(async () => auth.createCustomToken(userId), E.toError)),
  };
};
