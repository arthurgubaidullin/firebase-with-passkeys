import { Functions } from 'firebase/functions';
import { startAuthenticationApi } from './start-authentication-api';
import { PasskeysClientApi } from './api-type';

export const getPasskeysClientApi = (
  functions: Functions
): PasskeysClientApi => ({
  startAuthentication: startAuthenticationApi(functions),
});
