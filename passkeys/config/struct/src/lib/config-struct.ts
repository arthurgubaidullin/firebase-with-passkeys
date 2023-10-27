import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export interface UnsafeConfigStruct {
  readonly NX_RP_NAME: string | undefined;
  readonly NX_RP_ID: string | undefined;
  readonly NX_ORIGIN: string | undefined;
}

export type ConfigStruct = t.TypeOf<typeof ConfigStruct>;

export const ConfigStruct = t.readonly(
  t.strict({
    NX_RP_NAME: NonEmptyString,
    NX_RP_ID: NonEmptyString,
    NX_ORIGIN: NonEmptyString,
  })
);
