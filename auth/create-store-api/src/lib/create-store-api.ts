import { createStore } from '@firebase-with-passkeys/auth-create-store';
import * as AuthState from '@firebase-with-passkeys/auth-state';
import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import { ReadonlyObservable } from '@firebase-with-passkeys/observable-type';
import { createRealtimeObservable } from '@firebase-with-passkeys/remote-data';
import { FirebaseApp } from 'firebase/app';
import { pipe } from 'fp-ts/function';
import { action, observable, onBecomeObserved, onBecomeUnobserved } from 'mobx';
import {
  onAuthStateChangedAdapter,
  onAuthStateChangedAdapter2,
} from './on-auth-state-changed-adapter';
import { RemoteData } from '@firebase-with-passkeys/remote-data-display';
import { Option } from 'fp-ts/Option';

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

export const createAuthStateStoreApi2 = (
  firebaseApp: FirebaseApp
): ReadonlyObservable<RemoteData<Error, Option<UserStruct>>> =>
  pipe(firebaseApp, onAuthStateChangedAdapter2, createRealtimeObservable);
