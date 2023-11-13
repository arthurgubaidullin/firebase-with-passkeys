import { getClientPasskeysProgram } from '@firebase-with-passkeys/passkeys-program-client';
import { startRegistrationApi as _startRegistrationApi } from './start-registration-api';
import { Functions } from 'firebase/functions';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';

export type StartRegistrationApi = TE.TaskEither<Error, void>;

export const startRegistrationApi = (
  functions: Functions
): StartRegistrationApi =>
  pipe(functions, getClientPasskeysProgram, _startRegistrationApi);
