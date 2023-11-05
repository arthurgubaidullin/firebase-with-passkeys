import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as E from 'fp-ts/Either';

export interface GetUser {
  readonly getUser: (userId: string) => Promise<E.Either<Error, UserStruct>>;
}
