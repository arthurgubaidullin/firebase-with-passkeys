import { AuthenticationResponseJSON } from '@firebase-with-passkeys/passkeys-types';
import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export type RequestData = t.TypeOf<typeof RequestData>;

export const RequestData = t.readonly(
  t.strict({
    username: NonEmptyString,
    response: AuthenticationResponseJSON,
  })
);
