import * as t from 'io-ts';
import { CredentialPropertiesOutput } from './credential-properties-output';

export const AuthenticationExtensionsClientOutputs = t.readonly(
  t.partial({
    appid: t.boolean,
    credProps: CredentialPropertiesOutput,
    hmacCreateSecret: t.boolean,
  })
);
