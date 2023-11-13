import { Functions } from 'firebase/functions';
import { startAuthenticationApi } from '@firebase-with-passkeys/passkeys-start-authentication-api';
import { StartAuthenticationApi, StartRegistrationApi } from './api-type';
import { startRegistrationApi } from '@firebase-with-passkeys/passkeys-start-registration-api';

type PasskeysClientApi = StartAuthenticationApi & StartRegistrationApi;

export const getPasskeysClientApi = (
  functions: Functions
): PasskeysClientApi => ({
  startAuthentication: startAuthenticationApi(functions),
  startRegistration: startRegistrationApi(functions),
});
