import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as TE from 'fp-ts/TaskEither';

export interface GetUserByEmail {
  readonly getUserByEmail: (email: string) => TE.TaskEither<Error, UserStruct>;
}
