import { getFunctions } from '@firebase-with-passkeys/firebase-app-functions';
import { getClientPasskeysProgram } from '@firebase-with-passkeys/passkeys-program-client';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { startRegistrationApi as _startRegistrationApi } from './start-registration-api';
import { getAuth } from '@firebase-with-passkeys/firebase-app-auth';

export type StartRegistrationApi = TE.TaskEither<Error, void>;

export const startRegistrationApi: StartRegistrationApi = pipe(
  { functions: getFunctions(), auth: getAuth() },
  getClientPasskeysProgram,
  _startRegistrationApi
);
