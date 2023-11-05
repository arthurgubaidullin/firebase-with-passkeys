import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { pipe } from 'fp-ts/function';
import { GetUser } from './get-user-type';
import { LogError } from './log-error';

export const getUser =
  (P: GetUser & LogError) =>
  async (userId: string): Promise<O.Option<UserStruct>> =>
    pipe(
      async () => P.getUser(userId),
      TE.orElseFirstIOK((e) => () => {
        P.error(e.message, e);
      }),
      TO.fromTaskEither,
      (t) => t()
    );
