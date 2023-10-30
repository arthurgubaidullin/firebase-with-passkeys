import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import * as E from 'fp-ts/Either';
import { flow } from 'fp-ts/function';
import { failure } from 'io-ts/PathReporter';
import { InvalidAuthenticator } from './invalid-document';

export const validateDocumentData = (
  data: Readonly<{
    userId: string;
    authenticatorId: string;
  }>
) =>
  flow(
    AuthenticatorDocument.decode,
    E.mapLeft(failure),
    E.mapLeft(InvalidAuthenticator.create(data))
  );
