import { Functions } from 'firebase/functions';
import { startAuthenticationApi } from '@firebase-with-passkeys/passkeys-start-authentication-api';
import { PasskeysClientApi } from './api-type';
import { startRegistrationApi } from '@firebase-with-passkeys/passkeys-start-registration-api';

export const getPasskeysClientApi = (
  functions: Functions
): PasskeysClientApi => ({
  startAuthentication: startAuthenticationApi(functions),
  startRegistration: startRegistrationApi(functions),
});
