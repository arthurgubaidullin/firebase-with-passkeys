import * as t from 'io-ts';
import { Base64URLString } from './base64-url-string';
import { PublicKeyCredentialDescriptorJSON } from './public-key-credential-descriptor-json';
import { UserVerificationRequirement } from './user-verification-requirement';
import { AuthenticationExtensionsClientInputs } from './authentication-extensions-client-inputs';
import { PublicKeyCredentialRequestOptionsJSON as _PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/typescript-types';

type PublicKeyCredentialRequestOptionsJSON = t.TypeOf<
  typeof PublicKeyCredentialRequestOptionsJSON
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const id = (
  a: PublicKeyCredentialRequestOptionsJSON
): _PublicKeyCredentialRequestOptionsJSON => a;

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
