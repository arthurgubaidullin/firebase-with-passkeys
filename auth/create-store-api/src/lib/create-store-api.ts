import { createStore } from '@firebase-with-passkeys/auth-create-store';
import * as AuthState from '@firebase-with-passkeys/auth-state';
import {
  UserStruct,
  fromUserRecord,
} from '@firebase-with-passkeys/auth-user-struct';
import { ReadonlyObservable } from '@firebase-with-passkeys/observable-type';
import { FirebaseApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { action, observable, onBecomeObserved, onBecomeUnobserved } from 'mobx';

const onAuthStateChangedAdapter =
  (firebaseApp: FirebaseApp) => (f: (user: O.Option<UserStruct>) => void) => {
    const auth = getAuth(firebaseApp);
    return onAuthStateChanged(auth, (user) =>
      pipe(user, O.fromNullable, O.map(fromUserRecord), f)
    );
  };

export const createAuthStateStoreApi = (
  firebaseApp: FirebaseApp
): ReadonlyObservable<AuthState.AuthState> =>
  createStore({
    onAuthStateChanged: onAuthStateChangedAdapter(firebaseApp),
    observable: (a) => observable.box(a, { deep: false }),
    action,
    onBecomeObserved,
    onBecomeUnobserved,
  });
