import {
  AuthenticatorDocument,
  AuthenticatorDocumentVersion,
} from '@firebase-with-passkeys/passkeys-authenticator-document';
import * as O from 'fp-ts/Option';
import * as TO from 'fp-ts/TaskOption';

export interface GetAuthenticator {
  readonly getAuthenticator: (
    userId: string,
    authenticatorId: string
  ) => TO.TaskOption<
    readonly [AuthenticatorDocument, O.Option<AuthenticatorDocumentVersion>]
  >;
}
