import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export interface Base64URLStringBrand {
  readonly Base64URLString: unique symbol;
}

export const Base64URLString = t.brand(
  NonEmptyString,
  (_): _ is t.Branded<NonEmptyString, Base64URLStringBrand> => true,
  'Base64URLString'
);
