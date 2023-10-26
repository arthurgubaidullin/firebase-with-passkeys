import * as t from 'io-ts';

export const UserVerificationRequirement = t.keyof({
  discouraged: null,
  preferred: null,
  required: null,
});
