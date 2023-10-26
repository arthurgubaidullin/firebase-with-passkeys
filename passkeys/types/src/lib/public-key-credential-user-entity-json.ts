import * as t from 'io-ts';

export const PublicKeyCredentialUserEntityJSON = t.readonly(
  t.strict({
    id: t.string,
    name: t.string,
    displayName: t.string,
  })
);
