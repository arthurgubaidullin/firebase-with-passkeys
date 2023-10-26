import * as t from 'io-ts';
import { Base64URLString } from './base64-url-string';
import { PublicKeyCredentialDescriptorJSON } from './public-key-credential-descriptor-json';
import { AuthenticationExtensionsClientInputs } from './authentication-extensions-client-inputs';
import { PublicKeyCredentialRpEntity } from './public-key-credential-rp-entity';
import { PublicKeyCredentialUserEntityJSON } from './public-key-credential-user-entity-json';
import { PublicKeyCredentialParameters } from './public-key-credential-parameters';
import { AuthenticatorSelectionCriteria } from './authenticator-selection-criteria';
import { AttestationConveyancePreference } from './attestation-conveyance-preference';

export const PublicKeyCredentialCreationOptionsJSON = t.readonly(
  t.intersection([
    t.strict({
      rp: PublicKeyCredentialRpEntity,
      user: PublicKeyCredentialUserEntityJSON,
      challenge: Base64URLString,
      pubKeyCredParams: t.array(PublicKeyCredentialParameters),
    }),
    t.partial({
      authenticatorSelection: AuthenticatorSelectionCriteria,
      excludeCredentials: t.array(PublicKeyCredentialDescriptorJSON),
      attestation: AttestationConveyancePreference,
      timeout: t.number,
      extensions: AuthenticationExtensionsClientInputs,
    }),
  ])
);
