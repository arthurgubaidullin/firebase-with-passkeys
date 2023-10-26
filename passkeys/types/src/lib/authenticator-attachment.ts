import * as t from 'io-ts';

export const AuthenticatorAttachment = t.keyof({
  'cross-platform': null,
  platform: null,
});
