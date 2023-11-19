import {
  UserStruct,
  fromUserRecord,
} from '@firebase-with-passkeys/auth-user-struct';
import { Observer } from '@firebase-with-passkeys/remote-data-realtime-observable';
import { FirebaseApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { IO } from 'fp-ts/IO';

export const onAuthStateChangedAdapter =
  (firebaseApp: FirebaseApp) => (f: (user: O.Option<UserStruct>) => void) => {
    const auth = getAuth(firebaseApp);
    return onAuthStateChanged(auth, (user) =>
      pipe(user, O.fromNullable, O.map(fromUserRecord), f)
    );
  };

export const onAuthStateChangedAdapter2 =
  (firebaseApp: FirebaseApp) =>
  (observer: Observer<Error, O.Option<UserStruct>>): IO<void> => {
    const auth = getAuth(firebaseApp);
    return onAuthStateChanged(auth, {
      next: (user): void =>
        pipe(user, O.fromNullable, O.map(fromUserRecord), (u) =>
          observer.next?.(u)
        ),
      error: (e): void => {
        observer.error?.(e);
      },
      complete: (): void => observer.complete?.(),
    });
  };
