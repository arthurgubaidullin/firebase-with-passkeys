import { Functions, HttpsCallable, httpsCallable } from 'firebase/functions';

const verifyAuthenticationResponse = (functions: Functions) =>
  httpsCallable(functions, 'verifyAuthenticationResponse');

export const getVerifyAuthenticationResponseFirebaseFunction = (
  functions: Functions
): {
  readonly verifyAuthenticationResponse: HttpsCallable<unknown, unknown>;
} => ({
  verifyAuthenticationResponse: verifyAuthenticationResponse(functions),
});
