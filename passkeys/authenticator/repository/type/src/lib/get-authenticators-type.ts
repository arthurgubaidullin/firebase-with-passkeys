import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';

export interface GetAuthenticators {
  readonly getAuthenticators: (
    userId: string
  ) => Promise<AuthenticatorDocument[]>;
}
