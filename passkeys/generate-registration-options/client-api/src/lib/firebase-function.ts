import { Functions, getFunctions, httpsCallable } from 'firebase/functions';

export const generateRegistrationOptions = (functions?: Functions) =>
  httpsCallable(functions ?? getFunctions(), 'generateRegistrationOptions');
