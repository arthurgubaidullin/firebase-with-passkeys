import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { UpdateAuthenticator } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { Timestamp } from 'firebase-admin/firestore';
import { OutputOf } from 'io-ts';

export const updateAuthenticatorDocument =
  (P: UpdateAuthenticator) =>
  (userId: string, authenticatorId: string, updateAt: Timestamp) =>
  async (authenticator: OutputOf<typeof AuthenticatorDocument>) => {
    const data = AuthenticatorDocument.encode(authenticator);
    await P.updateAuthenticator(userId, authenticatorId, updateAt)(data);
  };
