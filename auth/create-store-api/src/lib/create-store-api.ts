import * as AuthState from '@firebase-with-passkeys/auth-state';
import {
  UserStruct,
  fromUserRecord,
} from '@firebase-with-passkeys/auth-user-struct';
import { getOrInitializeApp } from '@firebase-with-passkeys/get-or-initialize-firebase-app';
import { FirebaseOptions } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { action, observable, onBecomeObserved, onBecomeUnobserved } from 'mobx';
import { createStore } from '@firebase-with-passkeys/auth-create-store';
import { ReadonlyObservable } from '@firebase-with-passkeys/observable-type';

const onAuthStateChangedAdapter =
  (config: FirebaseOptions) => (f: (user: O.Option<UserStruct>) => void) => {
    const auth = getAuth(getOrInitializeApp(config));
    return onAuthStateChanged(auth, (user) =>
      pipe(user, O.fromNullable, O.map(fromUserRecord), f)
    );
  };

export const createAuthStateStoreApi = (
  config: FirebaseOptions
): ReadonlyObservable<AuthState.AuthState> =>
  createStore({
    onAuthStateChanged: onAuthStateChangedAdapter(config),
    observable: (a) => observable.box(a, { deep: false }),
    action,
    onBecomeObserved,
    onBecomeUnobserved,
  });
