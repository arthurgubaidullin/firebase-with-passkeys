import { getGenerateAuthenticationOptionsFunction } from '@firebase-with-passkeys/passkeys-generate-authentication-options-firebase-function-client';
import { getGenerateRegistrationOptionsFirebaseFunction } from '@firebase-with-passkeys/passkeys-generate-registration-options-firebase-function-client';
import { getVerifyRegistrationResponseFirebaseFunction } from '@firebase-with-passkeys/passkeys-verify-registration-response-firebase-function-client';
import { HttpsCallable } from 'firebase/functions';

type ClientProgram = Readonly<{
  generateRegistrationOptions: HttpsCallable<unknown, unknown>;
  generateAuthenticationOptions: HttpsCallable<unknown, unknown>;
  verifyRegistrationResponse: HttpsCallable<unknown, unknown>;
}>;

export const getClientPasskeysProgram = (): ClientProgram => {
  return {
    ...getGenerateAuthenticationOptionsFunction(),
    ...getGenerateRegistrationOptionsFirebaseFunction(),
    ...getVerifyRegistrationResponseFirebaseFunction(),
  };
};
