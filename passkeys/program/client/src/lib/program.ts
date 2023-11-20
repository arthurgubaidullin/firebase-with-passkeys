import { getGenerateAuthenticationOptionsFirebaseFunction } from '@firebase-with-passkeys/passkeys-generate-authentication-options-firebase-function-client';
import { getGenerateRegistrationOptionsFirebaseFunction } from '@firebase-with-passkeys/passkeys-generate-registration-options-firebase-function-client';
import { getVerifyAuthenticationResponseFirebaseFunction } from '@firebase-with-passkeys/passkeys-verify-authentication-response-firebase-function-client';
import { getVerifyRegistrationResponseFirebaseFunction } from '@firebase-with-passkeys/passkeys-verify-registration-response-firebase-function-client';
import { Auth, signInWithCustomToken } from 'firebase/auth';
import { Functions, HttpsCallable } from 'firebase/functions';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';

interface ClientProgram {
  readonly generateRegistrationOptions: HttpsCallable<unknown, unknown>;
  readonly generateAuthenticationOptions: HttpsCallable<unknown, unknown>;
  readonly verifyRegistrationResponse: HttpsCallable<unknown, unknown>;
  readonly verifyAuthenticationResponse: HttpsCallable<unknown, unknown>;
  readonly signInWithCustomToken: (token: string) => TE.TaskEither<Error, void>;
}

export const getClientPasskeysProgram = (data: {
  functions: Functions;
  auth: Auth;
}): ClientProgram => {
  return {
    ...getGenerateAuthenticationOptionsFirebaseFunction(data.functions),
    ...getGenerateRegistrationOptionsFirebaseFunction(data.functions),
    ...getVerifyRegistrationResponseFirebaseFunction(data.functions),
    ...getVerifyAuthenticationResponseFirebaseFunction(data.functions),
    signInWithCustomToken: (t) => {
      return TE.tryCatch(async () => {
        await signInWithCustomToken(data.auth, t);
      }, E.toError);
    },
  };
};
