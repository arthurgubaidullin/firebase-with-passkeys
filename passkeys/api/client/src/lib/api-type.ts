import { StartAuthenticationApi as _StartAuthenticationApi } from '@firebase-with-passkeys/passkeys-start-authentication-api';

export interface StartAuthenticationApi {
  readonly startAuthentication: _StartAuthenticationApi;
}

export type PasskeysClientApi = StartAuthenticationApi;
