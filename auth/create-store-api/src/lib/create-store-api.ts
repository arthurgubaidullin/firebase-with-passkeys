import { createStore } from '@firebase-with-passkeys/auth-create-store';
import * as AuthState from '@firebase-with-passkeys/auth-state';
import { ReadonlyObservable } from '@firebase-with-passkeys/observable-type';
import { FirebaseApp } from 'firebase/app';
import { action, observable, onBecomeObserved, onBecomeUnobserved } from 'mobx';
import { onAuthStateChangedAdapter } from './on-auth-state-changed-adapter';

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
