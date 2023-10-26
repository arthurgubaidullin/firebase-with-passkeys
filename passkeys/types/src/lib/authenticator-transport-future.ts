import * as t from 'io-ts';

export const AuthenticatorTransportFuture = t.keyof({
  ble: null,
  cable: null,
  hybrid: null,
  internal: null,
  nfc: null,
  'smart-card': null,
  usb: null,
});
