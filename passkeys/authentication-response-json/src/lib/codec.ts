import * as t from 'io-ts';

const AuthenticatorAttachment = t.keyof({
  'cross-platform': null,
  platform: null,
});

const AuthenticatorAssertionResponseJSON = t.readonly(
  t.intersection([
    t.strict({
      clientDataJSON: t.string,
      authenticatorData: t.string,
      signature: t.string,
    }),
    t.partial({
      userHandle: t.string,
    }),
  ])
);

const CredentialPropertiesOutput = t.readonly(t.partial({ rk: t.boolean }));

const AuthenticationExtensionsClientOutputs = t.readonly(
  t.partial({
    appid: t.boolean,
    credProps: CredentialPropertiesOutput,
    hmacCreateSecret: t.boolean,
  })
);

const PublicKeyCredentialType = t.literal('public-key');

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
