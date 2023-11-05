import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import { Unsubscribe } from './unsubscribe-type';
import { Option } from 'fp-ts/Option';

export interface OnAuthStateChanged {
  readonly onAuthStateChanged: (
    f: (user: Option<UserStruct>) => void
  ) => Unsubscribe;
}
