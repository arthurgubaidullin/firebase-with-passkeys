import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as TO from 'fp-ts/TaskOption';

export interface GetUser {
  readonly getUser: (userId: string) => TO.TaskOption<UserStruct>;
}
