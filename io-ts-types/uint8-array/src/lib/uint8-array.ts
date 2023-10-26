import * as t from 'io-ts';
import { fromRefinement } from 'io-ts-types';

export const Uint8ArrayCodec: t.Type<Uint8Array, Uint8Array, unknown> =
  fromRefinement(
    'Uint8Array',
    (u: unknown): u is Uint8Array => u instanceof Uint8Array
  );
