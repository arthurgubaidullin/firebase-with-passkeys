import { Functions, getFunctions, httpsCallable } from 'firebase/functions';

const generateRegistrationOptions = (functions?: Functions) =>
  httpsCallable(functions ?? getFunctions(), 'generateRegistrationOptions');

export const getGenerateRegistrationOptionsFirebaseFunction = (
  functions?: Functions
) => ({
  generateRegistrationOptions: generateRegistrationOptions(functions),
});
