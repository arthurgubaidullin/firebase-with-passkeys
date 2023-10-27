import { UserRecord } from 'firebase-admin/auth';
import * as O from 'fp-ts/Option';
import * as AuthRepository from '@firebase-with-passkeys/auth-user-repository';
import * as functions from 'firebase-functions/v1';
import { getUser } from '@firebase-with-passkeys/auth-get-user';

interface GetUserApi {
  readonly getUser: (userId: string) => Promise<O.Option<UserRecord>>;
}

export const get = (): GetUserApi => {
  const P = {
    ...AuthRepository.get(),
    ...functions.logger,
  } as const;
  return {
    getUser: getUser(P),
  };
};
