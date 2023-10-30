import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as O from 'fp-ts/Option';

export interface GetUserByEmail {
  readonly getUserByEmail: (userId: string) => Promise<O.Option<UserStruct>>;
}
