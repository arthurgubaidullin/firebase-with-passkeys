import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { CreateAuthenticator } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { OutputOf } from 'io-ts';
import { Buffer } from 'node:buffer';

export const createAuthenticatorDocument =
  (P: CreateAuthenticator) =>
  async (
    userId: string,
    authenticator: OutputOf<typeof AuthenticatorDocument>
  ) => {
    const data = AuthenticatorDocument.encode(authenticator);
    const authenticatorId = Buffer.from(data.credentialID).toString(
      'base64url'
    );
    await P.createAuthenticator(userId, authenticatorId, data);
  };
