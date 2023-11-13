import {
  StartAuthenticationApi,
  startAuthenticationApi as _startAuthenticationApi,
} from '@firebase-with-passkeys/passkeys-start-authentication-api';
import { Functions } from 'firebase/functions';
import { pipe } from 'fp-ts/function';

export const startAuthenticationApi = (
  functions: Functions
): StartAuthenticationApi => pipe(functions, _startAuthenticationApi);
