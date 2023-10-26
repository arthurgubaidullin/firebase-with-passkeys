import * as t from 'io-ts';
import { AuthenticatorAssertionResponseJSON } from './authenticator-assertion-response-json';
import { AuthenticatorAttachment } from './authenticator-attachment';
import { PublicKeyCredentialType } from './public-key-credential-type';
import { AuthenticationExtensionsClientOutputs } from './authentication-extensions-client-outputs';

export const AuthenticationResponseJSON = t.readonly(
  t.intersection([
    t.strict({
      id: t.string,
      rawId: t.string,
      response: AuthenticatorAssertionResponseJSON,
      clientExtensionResults: AuthenticationExtensionsClientOutputs,
      type: PublicKeyCredentialType,
    }),
    t.partial({
      authenticatorAttachment: AuthenticatorAttachment,
    }),
  ])
);
