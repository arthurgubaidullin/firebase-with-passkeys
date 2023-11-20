import { getFunctions } from '@firebase-with-passkeys/firebase-app-functions';
import { getClientPasskeysProgram } from '@firebase-with-passkeys/passkeys-program-client';
import { TaskEither } from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { startAuthenticationApi as _startAuthenticationApi } from './start-authentication-api';
import { getAuth } from '@firebase-with-passkeys/firebase-app-auth';

export type StartAuthenticationApi = (
  username: string
) => TaskEither<Error, void>;

export const startAuthenticationApi: StartAuthenticationApi = pipe(
  { functions: getFunctions(), auth: getAuth() },
  getClientPasskeysProgram,
  _startAuthenticationApi
);
