import { PublicKeyCredentialRequestOptionsJSON } from '@firebase-with-passkeys/passkeys-types';
import * as t from 'io-ts';
import { JsonFromString } from 'io-ts-types';

export type ResponseData = t.OutputOf<typeof ResponseData>;

export const ResponseData = t.string.pipe(
  JsonFromString.pipe(PublicKeyCredentialRequestOptionsJSON)
);
