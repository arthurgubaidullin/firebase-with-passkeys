import * as t from 'io-ts';

export const AuthenticationExtensionsClientInputs = t.readonly(
  t.partial({
    appid: t.string,
    credProps: t.boolean,
    hmacCreateSecret: t.boolean,
  })
);
