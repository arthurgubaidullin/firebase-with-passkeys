import { Functions, httpsCallable } from 'firebase/functions';

const verifyRegistrationResponse = (functions: Functions) =>
  httpsCallable(functions, 'verifyRegistrationResponse');

export const getVerifyRegistrationResponseFirebaseFunction = (
  functions: Functions
) => ({
  verifyRegistrationResponse: verifyRegistrationResponse(functions),
});
