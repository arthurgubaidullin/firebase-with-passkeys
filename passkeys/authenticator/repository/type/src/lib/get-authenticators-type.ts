import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';

export interface GetAuthenticators {
  readonly getAuthenticators: (
    username: string
  ) => Promise<AuthenticatorDocument[]>;
}
