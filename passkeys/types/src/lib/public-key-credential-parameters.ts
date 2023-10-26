import * as t from 'io-ts';
import { COSEAlgorithmIdentifier } from './cose-algorithm-identifier';
import { PublicKeyCredentialType } from './public-key-credential-type';

export const PublicKeyCredentialParameters = t.readonly(
  t.strict({
    alg: COSEAlgorithmIdentifier,
    type: PublicKeyCredentialType,
  })
);
