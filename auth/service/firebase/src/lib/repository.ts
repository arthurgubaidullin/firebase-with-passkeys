import { getAuth } from 'firebase-admin/auth';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { AuthRepository } from '@firebase-with-passkeys/auth-repository-type';
import { pipe } from 'fp-ts/function';
import { fromUserRecord } from '@firebase-with-passkeys/auth-user-struct';

export const get = (): AuthRepository => {
  const auth = getAuth();
  return {
    getUser: async (userId) =>
      pipe(
        TE.tryCatch(() => auth.getUser(userId), E.toError),
        TE.map(fromUserRecord),
        (t) => t()
      ),
    getUserByEmail: async (email) =>
      pipe(
        TE.tryCatch(() => auth.getUserByEmail(email), E.toError),
        TE.map(fromUserRecord),
        (t) => t()
      ),
  };
};
