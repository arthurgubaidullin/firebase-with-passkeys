import * as t from 'io-ts';
import { PublicKeyCredentialEntity } from './public-key-credential-entity';

export const PublicKeyCredentialRpEntity = t.readonly(
  t.intersection([PublicKeyCredentialEntity, t.partial({ id: t.string })])
);
