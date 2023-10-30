import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import * as O from 'fp-ts/Option';

export interface GetAuthenticator {
  readonly getAuthenticator: (
    userId: string,
    authenticatorId: string
  ) => Promise<O.Option<readonly [AuthenticatorDocument, number]>>;
}
