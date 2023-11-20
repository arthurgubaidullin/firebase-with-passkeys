import {
  AuthenticatorDocument,
  AuthenticatorDocumentVersion,
} from '@firebase-with-passkeys/passkeys-authenticator-document';
import { Option } from 'fp-ts/Option';

export interface UpdateAuthenticator {
  readonly updateAuthenticator: (
    userId: string,
    authenticatorId: string,
    updatedAt: Option<AuthenticatorDocumentVersion>
  ) => (authenticator: AuthenticatorDocument) => Promise<void>;
}
