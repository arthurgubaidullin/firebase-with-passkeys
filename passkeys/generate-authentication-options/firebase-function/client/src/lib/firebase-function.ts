import { HttpsCallable, getFunctions, httpsCallable } from 'firebase/functions';

const generateAuthenticationOptions = () =>
  httpsCallable(getFunctions(), 'generateAuthenticationOptions');

export const getGenerateAuthenticationOptionsFunction = (): Readonly<{
  generateAuthenticationOptions: HttpsCallable<unknown, unknown>;
}> => ({
  generateAuthenticationOptions: generateAuthenticationOptions(),
});
