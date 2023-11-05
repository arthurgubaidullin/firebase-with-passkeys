import { GetUserByEmail } from '@firebase-with-passkeys/auth-repository-type';
import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { pipe } from 'fp-ts/function';
import { LogError } from './log-error';

export const getUserByEmail =
  (P: GetUserByEmail & LogError) =>
  async (userId: string): Promise<O.Option<UserStruct>> =>
    pipe(
      P.getUserByEmail(userId),
      TE.orElseFirstIOK((e) => () => {
        P.error(e.message, e);
      }),
      TO.fromTaskEither,
      (t) => t()
    );
