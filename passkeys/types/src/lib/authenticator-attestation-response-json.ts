import * as t from 'io-ts';
import { Base64URLString } from './base64-url-string';
import { AuthenticatorTransportFuture } from './authenticator-transport-future';
import { COSEAlgorithmIdentifier } from './cose-algorithm-identifier';

export const AuthenticatorAttestationResponseJSON = t.readonly(
  t.intersection([
    t.strict({
      clientDataJSON: Base64URLString,
      attestationObject: Base64URLString,
    }),
    t.partial({
      authenticatorData: Base64URLString,
      transports: t.array(AuthenticatorTransportFuture),
      publicKeyAlgorithm: COSEAlgorithmIdentifier,
      publicKey: Base64URLString,
    }),
  ])
);
