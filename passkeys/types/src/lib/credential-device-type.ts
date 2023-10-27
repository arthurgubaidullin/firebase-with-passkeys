import * as t from 'io-ts';

export const CredentialDeviceType = t.keyof({
  singleDevice: null,
  multiDevice: null,
});
