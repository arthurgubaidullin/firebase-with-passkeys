import * as t from 'io-ts';
import { Base64URLString } from './base64-url-string';
import { PublicKeyCredentialDescriptorJSON } from './public-key-credential-descriptor-json';
import { UserVerificationRequirement } from './user-verification-requirement';
import { AuthenticationExtensionsClientInputs } from './authentication-extensions-client-inputs';

export const PublicKeyCredentialRequestOptionsJSON = t.readonly(
  t.intersection([
    t.strict({
      challenge: Base64URLString,
    }),
    t.partial({
      timeout: t.number,
      rpId: t.string,
      allowCredentials: t.array(PublicKeyCredentialDescriptorJSON),
      userVerification: UserVerificationRequirement,
      extensions: AuthenticationExtensionsClientInputs,
    }),
  ])
);
