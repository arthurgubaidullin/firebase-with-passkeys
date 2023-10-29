import { UserRecord } from 'firebase-admin/auth';
import * as E from 'fp-ts/Either';

export interface GetUserByEmail {
  readonly getUserByEmail: (
    email: string
  ) => Promise<E.Either<Error, UserRecord>>;
}
