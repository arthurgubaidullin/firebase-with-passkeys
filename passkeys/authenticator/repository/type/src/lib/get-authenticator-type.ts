import { Timestamp } from 'firebase-admin/firestore';
import * as O from 'fp-ts/Option';
import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';

export interface GetAuthenticator {
  readonly getAuthenticator: (
    userId: string,
    authenticatorId: string
  ) => Promise<O.Option<readonly [AuthenticatorDocument, Timestamp]>>;
}
