import * as t from 'io-ts';
import { AuthenticatorAttachment } from './authenticator-attachment';
import { UserVerificationRequirement } from './user-verification-requirement';
import { ResidentKeyRequirement } from './resident-key-requirement';

export const AuthenticatorSelectionCriteria = t.readonly(
  t.partial({
    authenticatorAttachment: AuthenticatorAttachment,
    requireResidentKey: t.boolean,
    residentKey: ResidentKeyRequirement,
    userVerification: UserVerificationRequirement,
  })
);
