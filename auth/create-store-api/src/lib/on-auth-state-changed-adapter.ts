import {
  UserStruct,
  fromUserRecord,
} from '@firebase-with-passkeys/auth-user-struct';
import { FirebaseApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

export const onAuthStateChangedAdapter =
  (firebaseApp: FirebaseApp) => (f: (user: O.Option<UserStruct>) => void) => {
    const auth = getAuth(firebaseApp);
    return onAuthStateChanged(auth, (user) =>
      pipe(user, O.fromNullable, O.map(fromUserRecord), f)
    );
  };
