import { HttpsCallable, getFunctions, httpsCallable } from 'firebase/functions';

const verifyAuthenticationResponse = () =>
  httpsCallable(getFunctions(), 'verifyAuthenticationResponse');

export const getVerifyAuthenticationResponseFirebaseFunction = (): {
  readonly verifyAuthenticationResponse: HttpsCallable<unknown, unknown>;
} => ({
  verifyAuthenticationResponse: verifyAuthenticationResponse(),
});
