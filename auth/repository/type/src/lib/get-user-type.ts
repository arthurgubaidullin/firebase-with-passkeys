import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as TE from 'fp-ts/TaskEither';

export interface GetUser {
  readonly getUser: (userId: string) => TE.TaskEither<Error, UserStruct>;
}
