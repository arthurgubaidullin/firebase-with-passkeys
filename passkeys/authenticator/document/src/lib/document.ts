import * as t from 'io-ts';
import { Uint8ArrayCodec } from '@firebase-with-passkeys/uint8-array';
import {
  AuthenticatorTransport,
  CredentialDeviceType,
} from '@firebase-with-passkeys/passkeys-types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthenticatorDocument
  extends t.TypeOf<typeof AuthenticatorDocument> {}

export const AuthenticatorDocument = t.strict({
  credentialID: Uint8ArrayCodec,
  credentialPublicKey: Uint8ArrayCodec,
  counter: t.number,
  credentialDeviceType: CredentialDeviceType,
  credentialBackedUp: t.boolean,
  transports: t.array(AuthenticatorTransport),
});
