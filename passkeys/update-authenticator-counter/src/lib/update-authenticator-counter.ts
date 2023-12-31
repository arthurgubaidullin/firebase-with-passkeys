import {
  AuthenticatorDocument,
  AuthenticatorDocumentVersion,
} from '@firebase-with-passkeys/passkeys-authenticator-document';
import { UpdateAuthenticator } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { updateAuthenticatorDocument } from '@firebase-with-passkeys/passkeys-update-authenticator-document';
import { Option } from 'fp-ts/Option';

export const updateAuthenticatorCounter =
  (P: UpdateAuthenticator) =>
  (
    userId: string,
    authenticatorId: string,
    counter: number,
    updatedAt: Option<AuthenticatorDocumentVersion>
  ) =>
  async (authenticator: AuthenticatorDocument) => {
    const _authenticator = { ...authenticator, counter };
    await updateAuthenticatorDocument(P)(userId, authenticatorId, updatedAt)(
      _authenticator
    );
  };
