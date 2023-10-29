import { UserRecord } from 'firebase-admin/auth';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { pipe } from 'fp-ts/function';
import { LogError } from './log-error';
import { GetUserByEmail } from './get-user-by-email-type';

export const getUserByEmail =
  (P: GetUserByEmail & LogError) =>
  async (userId: string): Promise<O.Option<UserRecord>> =>
    pipe(
      async () => P.getUserByEmail(userId),
      TE.orElseFirstIOK((e) => () => {
        P.error(e.message, e);
      }),
      TO.fromTaskEither,
      (t) => t()
    );
