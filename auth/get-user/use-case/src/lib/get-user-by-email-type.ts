import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as E from 'fp-ts/Either';

export interface GetUserByEmail {
  readonly getUserByEmail: (
    email: string
  ) => Promise<E.Either<Error, UserStruct>>;
}
