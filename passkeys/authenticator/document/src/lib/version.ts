import * as t from 'io-ts';
import { fromNewtype } from 'io-ts-types';
import { Newtype, iso as _iso } from 'newtype-ts';

type AuthenticatorDocumentVersionStruct = t.TypeOf<
  typeof AuthenticatorDocumentVersionCodec
>;

const AuthenticatorDocumentVersionCodec = t.readonly(
  t.strict({
    seconds: t.number,
    nanoseconds: t.number,
  })
);

export interface AuthenticatorDocumentVersion
  extends Newtype<
    { readonly AuthenticatorDocumentVersion: unique symbol },
    AuthenticatorDocumentVersionStruct
  > {}

const AuthenticatorDocumentVersion = fromNewtype<AuthenticatorDocumentVersion>(
  AuthenticatorDocumentVersionCodec
);

const iso = _iso<AuthenticatorDocumentVersion>();

export const createAuthenticatorDocumentVersion = (data: {
  seconds: number;
  nanoseconds: number;
}): AuthenticatorDocumentVersion =>
  iso.wrap({ seconds: data.seconds, nanoseconds: data.nanoseconds });

export const secondsFromAuthenticatorDocumentVersion = (
  a: AuthenticatorDocumentVersion
) => iso.unwrap(a).seconds;

export const nanosecondsFromAuthenticatorDocumentVersion = (
  a: AuthenticatorDocumentVersion
) => iso.unwrap(a).nanoseconds;
