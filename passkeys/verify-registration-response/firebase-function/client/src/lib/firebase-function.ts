import { getFunctions, httpsCallable } from 'firebase/functions';

const verifyRegistrationResponse = () =>
  httpsCallable(getFunctions(), 'verifyRegistrationResponse');

export const getVerifyRegistrationResponseFirebaseFunction = () => ({
  verifyRegistrationResponse: verifyRegistrationResponse(),
});
