import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { pipe } from 'fp-ts/function';
import { GetUserByEmail } from './get-user-by-email-type';
import { LogError } from './log-error';

export const getUserByEmail =
  (P: GetUserByEmail & LogError) =>
  async (userId: string): Promise<O.Option<UserStruct>> =>
    pipe(
      async () => P.getUserByEmail(userId),
      TE.orElseFirstIOK((e) => () => {
        P.error(e.message, e);
      }),
      TO.fromTaskEither,
      (t) => t()
    );
