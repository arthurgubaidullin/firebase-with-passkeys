import { getAuth } from 'firebase-admin/auth';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { AuthRepository } from './repository-type';
import { pipe } from 'fp-ts/function';

export const get = (): AuthRepository => {
  const auth = getAuth();
  return {
    getUser: async (userId) =>
      pipe(
        TE.tryCatch(() => auth.getUser(userId), E.toError),
        (t) => t()
      ),
    getUserByEmail: async (email) =>
      pipe(
        TE.tryCatch(() => auth.getUserByEmail(email), E.toError),
        (t) => t()
      ),
  };
};
