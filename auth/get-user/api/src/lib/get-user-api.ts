import { getUser, getUserByEmail } from '@firebase-with-passkeys/auth-get-user';
import * as AuthRepository from '@firebase-with-passkeys/auth-repository-firebase-auth';
import {
  GetUser,
  GetUserByEmail,
} from '@firebase-with-passkeys/auth-service-type';
import * as functions from 'firebase-functions/v1';

export const getUserApi = (): GetUser & GetUserByEmail => {
  const P = {
    ...AuthRepository.get(),
    ...functions.logger,
  } as const;
  return {
    getUser: getUser(P),
    getUserByEmail: getUserByEmail(P),
  };
};
