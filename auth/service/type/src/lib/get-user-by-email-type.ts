import { UserRecord } from 'firebase-admin/auth';
import * as O from 'fp-ts/Option';

export interface GetUserByEmail {
  readonly getUserByEmail: (userId: string) => Promise<O.Option<UserRecord>>;
}
