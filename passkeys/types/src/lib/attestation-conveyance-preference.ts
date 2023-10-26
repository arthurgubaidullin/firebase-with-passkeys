import * as t from 'io-ts';

export const AttestationConveyancePreference = t.keyof({
  direct: null,
  enterprise: null,
  indirect: null,
  none: null,
});
