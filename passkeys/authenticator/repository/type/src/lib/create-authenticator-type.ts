import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';

export interface CreateAuthenticator {
  readonly createAuthenticator: (
    userId: string,
    authenticator: AuthenticatorDocument
  ) => Promise<void>;
}
