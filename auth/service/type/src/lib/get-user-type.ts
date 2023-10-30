import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as O from 'fp-ts/Option';

export interface GetUser {
  readonly getUser: (userId: string) => Promise<O.Option<UserStruct>>;
}
