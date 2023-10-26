import * as t from 'io-ts';

export const ResidentKeyRequirement = t.keyof({
  discouraged: null,
  preferred: null,
  required: null,
});
