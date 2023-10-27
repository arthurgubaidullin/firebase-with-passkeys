import * as t from 'io-ts';

export const AuthenticatorTransport = t.keyof({
  ble: null,
  hybrid: null,
  internal: null,
  nfc: null,
  usb: null,
});
