import { StartAuthenticationApi as _StartAuthenticationApi } from '@firebase-with-passkeys/passkeys-start-authentication-api';
import { StartRegistrationApi as _StartRegistrationApi } from '@firebase-with-passkeys/passkeys-start-registration-api';

export interface StartAuthenticationApi {
  readonly startAuthentication: _StartAuthenticationApi;
}
export interface StartRegistrationApi {
  readonly startRegistration: _StartRegistrationApi;
}
