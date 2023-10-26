import * as t from 'io-ts';
import { Base64URLString } from './base64-url-string';
import { PublicKeyCredentialType } from './public-key-credential-type';
import { AuthenticatorTransportFuture } from './authenticator-transport-future';

export const PublicKeyCredentialDescriptorJSON = t.readonly(
  t.intersection([
    t.strict({
      id: Base64URLString,
      type: PublicKeyCredentialType,
    }),
    t.partial({
      transports: t.array(AuthenticatorTransportFuture),
    }),
  ])
);
