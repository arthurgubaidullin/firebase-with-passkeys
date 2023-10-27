import { UserRecord } from 'firebase-admin/auth';
import * as O from 'fp-ts/Option';
import * as AuthRepository from '@firebase-with-passkeys/auth-user-repository';
import * as functions from 'firebase-functions/v1';
import { getUser as _getUser } from '@firebase-with-passkeys/auth-get-user';

export const getUser: (userId: string) => Promise<O.Option<UserRecord>> =
  _getUser({
    ...AuthRepository.get(),
    ...functions.logger,
  });
