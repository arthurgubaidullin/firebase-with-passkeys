import { getClientPasskeysProgram } from '@firebase-with-passkeys/passkeys-program-client';
import { Functions } from 'firebase/functions';
import { pipe } from 'fp-ts/function';
import { startAuthenticationApi as _startAuthenticationApi } from './start-authentication-api';
import { TaskEither } from 'fp-ts/TaskEither';

export type StartAuthenticationApi = (
  username: string
) => TaskEither<Error, void>;

export const startAuthenticationApi = (
  functions: Functions
): StartAuthenticationApi =>
  pipe(functions, getClientPasskeysProgram, _startAuthenticationApi);
