import { Functions, HttpsCallable, httpsCallable } from 'firebase/functions';

const generateAuthenticationOptions = (functions: Functions) =>
  httpsCallable(functions, 'generateAuthenticationOptions');

export const getGenerateAuthenticationOptionsFirebaseFunction = (
  functions: Functions
): Readonly<{
  generateAuthenticationOptions: HttpsCallable<unknown, unknown>;
}> => ({
  generateAuthenticationOptions: generateAuthenticationOptions(functions),
});
