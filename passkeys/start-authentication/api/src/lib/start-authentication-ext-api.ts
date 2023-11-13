import { getFunctions } from '@firebase-with-passkeys/firebase-app-functions';
import { getClientPasskeysProgram } from '@firebase-with-passkeys/passkeys-program-client';
import { TaskEither } from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { startAuthenticationApi as _startAuthenticationApi } from './start-authentication-api';

export type StartAuthenticationApi = (
  username: string
) => TaskEither<Error, void>;

export const startAuthenticationApi: StartAuthenticationApi = pipe(
  getFunctions(),
  getClientPasskeysProgram,
  _startAuthenticationApi
);
