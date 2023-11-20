import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { UpdateAuthenticator } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { OutputOf } from 'io-ts';
import { Option } from 'fp-ts/Option';

export const updateAuthenticatorDocument =
  (P: UpdateAuthenticator) =>
  (userId: string, authenticatorId: string, updateAt: Option<number>) =>
  async (authenticator: OutputOf<typeof AuthenticatorDocument>) => {
    const data = AuthenticatorDocument.encode(authenticator);
    await P.updateAuthenticator(userId, authenticatorId, updateAt)(data);
  };
