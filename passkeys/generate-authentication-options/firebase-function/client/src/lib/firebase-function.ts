import { HttpsCallable, getFunctions, httpsCallable } from 'firebase/functions';

const generateAuthenticationOptions = () =>
  httpsCallable(getFunctions(), 'generateAuthenticationOptions');

export const getGenerateAuthenticationOptionsFirebaseFunction = (): Readonly<{
  generateAuthenticationOptions: HttpsCallable<unknown, unknown>;
}> => ({
  generateAuthenticationOptions: generateAuthenticationOptions(),
});
