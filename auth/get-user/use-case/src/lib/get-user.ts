import { GetUser } from '@firebase-with-passkeys/auth-repository-type';
import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { pipe } from 'fp-ts/function';
import { LogError } from './log-error';

export const getUser =
  (P: GetUser & LogError) =>
  (userId: string): TO.TaskOption<UserStruct> =>
    pipe(
      P.getUser(userId),
      TE.orElseFirstIOK((e) => () => {
        P.error(e.message, e);
      }),
      TO.fromTaskEither
    );
