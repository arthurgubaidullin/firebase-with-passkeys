import { UserRecord } from 'firebase-admin/auth';
import * as O from 'fp-ts/Option';

export interface GetUser {
  readonly getUser: (userId: string) => Promise<O.Option<UserRecord>>;
}
