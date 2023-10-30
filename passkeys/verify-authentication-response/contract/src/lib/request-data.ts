import { AuthenticationResponseJSON } from '@firebase-with-passkeys/passkeys-types';
import { TypeOf } from 'io-ts';

export type RequestData = TypeOf<typeof RequestData>;

export const RequestData = AuthenticationResponseJSON;
