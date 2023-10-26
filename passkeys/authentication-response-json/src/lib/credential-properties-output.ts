import * as t from 'io-ts';

export const CredentialPropertiesOutput = t.readonly(
  t.partial({
    rk: t.boolean,
  })
);
