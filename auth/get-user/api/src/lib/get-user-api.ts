import { UserRecord } from 'firebase-admin/auth';
import * as O from 'fp-ts/Option';
import * as AuthRepository from '@firebase-with-passkeys/auth-service-firebase';
import * as functions from 'firebase-functions/v1';
import { getUser, getUserByEmail } from '@firebase-with-passkeys/auth-get-user';

interface GetUserApi {
  readonly getUser: (userId: string) => Promise<O.Option<UserRecord>>;
  readonly getUserByEmail: (email: string) => Promise<O.Option<UserRecord>>;
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
