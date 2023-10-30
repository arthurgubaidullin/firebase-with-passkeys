import { Functions, httpsCallable } from 'firebase/functions';

const generateRegistrationOptions = (functions: Functions) =>
  httpsCallable(functions, 'generateRegistrationOptions');

export const getGenerateRegistrationOptionsFirebaseFunction = (
  functions: Functions
) => ({
  generateRegistrationOptions: generateRegistrationOptions(functions),
});
