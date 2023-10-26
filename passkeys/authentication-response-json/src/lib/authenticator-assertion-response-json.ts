import * as t from 'io-ts';

export const AuthenticatorAssertionResponseJSON = t.readonly(
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
