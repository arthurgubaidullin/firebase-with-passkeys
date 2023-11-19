import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import { ReadonlyObservable } from '@firebase-with-passkeys/observable-type';
import { createRealtimeObservable } from '@firebase-with-passkeys/remote-data';
import { RemoteData } from '@firebase-with-passkeys/remote-data-display';
import { FirebaseApp } from 'firebase/app';
import { Option } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { onAuthStateChangedAdapter2 } from './on-auth-state-changed-adapter';

export const createAuthStateStoreApi =
  (firebaseApp: FirebaseApp) =>
  (): ReadonlyObservable<RemoteData<Error, Option<UserStruct>>> =>
    pipe(firebaseApp, onAuthStateChangedAdapter2, createRealtimeObservable);
