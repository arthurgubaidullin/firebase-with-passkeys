import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { CreateAuthenticator } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { OutputOf } from 'io-ts';

export const createAuthenticatorDocument =
  (P: CreateAuthenticator) =>
  async (
    userId: string,
    authenticator: OutputOf<typeof AuthenticatorDocument>
  ) => {
    const data = AuthenticatorDocument.encode(authenticator);
    await P.createAuthenticator(userId, data);
  };
