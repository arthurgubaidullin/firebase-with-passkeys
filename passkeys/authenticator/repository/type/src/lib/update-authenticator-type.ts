import { Timestamp } from 'firebase-admin/firestore';
import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';

export interface UpdateAuthenticator {
  readonly updateAuthenticator: (
    userId: string,
    authenticatorId: string,
    updatedAt: Timestamp
  ) => (authenticator: AuthenticatorDocument) => Promise<void>;
}
