import * as t from 'io-ts';

export interface COSEAlgorithmIdentifierBrand {
  readonly COSEAlgorithmIdentifier: unique symbol;
}

export const COSEAlgorithmIdentifier = t.brand(
  t.number,
  (_): _ is t.Branded<number, COSEAlgorithmIdentifierBrand> => true,
  'COSEAlgorithmIdentifier'
);
