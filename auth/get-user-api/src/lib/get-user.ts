import { UserRecord } from 'firebase-admin/auth';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { GetUser } from './get-user-type';
import { Logger } from './logger-type';
import { pipe } from 'fp-ts/function';

export const getUser =
  (P: GetUser & Logger) =>
  async (userId: string): Promise<O.Option<UserRecord>> =>
    pipe(
      async () => P.getUser(userId),
      TE.orElseFirstIOK((e) => () => {
        P.error(e);
      }),
      TO.fromTaskEither,
      (t) => t()
    );
