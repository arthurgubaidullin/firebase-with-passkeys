import { getUser, getUserByEmail } from '@firebase-with-passkeys/auth-get-user';
import * as AuthRepository from '@firebase-with-passkeys/auth-repository-firebase-auth';
import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import * as functions from 'firebase-functions/v1';
import * as O from 'fp-ts/Option';

interface GetUserApi {
  readonly getUser: (userId: string) => Promise<O.Option<UserStruct>>;
  readonly getUserByEmail: (email: string) => Promise<O.Option<UserStruct>>;
}

export const getUserApi = (): GetUserApi => {
  const P = {
    ...AuthRepository.get(),
    ...functions.logger,
  } as const;
  return {
    getUser: getUser(P),
    getUserByEmail: getUserByEmail(P),
  };
};
