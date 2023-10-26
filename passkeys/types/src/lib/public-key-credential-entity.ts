import * as t from 'io-ts';

export const PublicKeyCredentialEntity = t.readonly(
  t.strict({ name: t.string })
);
