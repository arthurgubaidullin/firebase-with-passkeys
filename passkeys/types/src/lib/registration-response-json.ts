import * as t from 'io-ts';
import { AuthenticatorAttachment } from './authenticator-attachment';
import { Base64URLString } from './base64-url-string';
import { PublicKeyCredentialType } from './public-key-credential-type';
import { AuthenticationExtensionsClientOutputs } from './authentication-extensions-client-outputs';
import { AuthenticatorAttestationResponseJSON } from './authenticator-attestation-response-json';

export type RegistrationResponseJSON = t.TypeOf<
  typeof RegistrationResponseJSON
>;

export const RegistrationResponseJSON = t.readonly(
  t.intersection([
    t.strict({
      id: Base64URLString,
      rawId: Base64URLString,
      response: AuthenticatorAttestationResponseJSON,
      clientExtensionResults: AuthenticationExtensionsClientOutputs,
      type: PublicKeyCredentialType,
    }),
    t.partial({
      authenticatorAttachment: AuthenticatorAttachment,
    }),
  ])
);
