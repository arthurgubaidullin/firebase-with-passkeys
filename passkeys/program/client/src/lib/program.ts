import { getGenerateAuthenticationOptionsFirebaseFunction } from '@firebase-with-passkeys/passkeys-generate-authentication-options-firebase-function-client';
import { getGenerateRegistrationOptionsFirebaseFunction } from '@firebase-with-passkeys/passkeys-generate-registration-options-firebase-function-client';
import { getVerifyAuthenticationResponseFirebaseFunction } from '@firebase-with-passkeys/passkeys-verify-authentication-response-firebase-function-client';
import { getVerifyRegistrationResponseFirebaseFunction } from '@firebase-with-passkeys/passkeys-verify-registration-response-firebase-function-client';
import { HttpsCallable } from 'firebase/functions';

type ClientProgram = Readonly<{
  generateRegistrationOptions: HttpsCallable<unknown, unknown>;
  generateAuthenticationOptions: HttpsCallable<unknown, unknown>;
  verifyRegistrationResponse: HttpsCallable<unknown, unknown>;
  verifyAuthenticationResponse: HttpsCallable<unknown, unknown>;
}>;

export const getClientPasskeysProgram = (): ClientProgram => {
  return {
    ...getGenerateAuthenticationOptionsFirebaseFunction(),
    ...getGenerateRegistrationOptionsFirebaseFunction(),
    ...getVerifyRegistrationResponseFirebaseFunction(),
    ...getVerifyAuthenticationResponseFirebaseFunction(),
  };
};
