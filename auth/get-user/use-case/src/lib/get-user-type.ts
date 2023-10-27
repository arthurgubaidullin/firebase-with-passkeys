import { UserRecord } from 'firebase-admin/auth';
import * as E from 'fp-ts/Either';

export interface GetUser {
  readonly getUser: (userId: string) => Promise<E.Either<Error, UserRecord>>;
}
