import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';

export interface UpdateAuthenticator {
  readonly updateAuthenticator: (
    userId: string,
    authenticatorId: string,
    updatedAt: number
  ) => (authenticator: AuthenticatorDocument) => Promise<void>;
}
