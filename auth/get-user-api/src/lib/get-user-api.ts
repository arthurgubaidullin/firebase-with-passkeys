import { UserRecord } from 'firebase-admin/auth';
import * as O from 'fp-ts/Option';
import * as AuthRepository from '@firebase-with-passkeys/user-auth-repository';
import * as functions from 'firebase-functions/v1';
import { getUser as _getUser } from './get-user';

export const getUser: (userId: string) => Promise<O.Option<UserRecord>> =
  _getUser({
    ...AuthRepository.get(),
    ...functions.logger,
  });
