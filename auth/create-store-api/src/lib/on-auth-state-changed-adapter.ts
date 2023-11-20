import {
  UserStruct,
  fromUserRecord,
} from '@firebase-with-passkeys/auth-user-struct';
import { getAuth } from '@firebase-with-passkeys/firebase-app-auth';
import { Observer } from '@firebase-with-passkeys/remote-data-realtime-observable';
import { onAuthStateChanged } from 'firebase/auth';
import { IO } from 'fp-ts/IO';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

export const onAuthStateChangedAdapter = (
  f: (user: O.Option<UserStruct>) => void
) => {
  const auth = getAuth();
  return onAuthStateChanged(auth, (user) =>
    pipe(user, O.fromNullable, O.map(fromUserRecord), f)
  );
};

export const onAuthStateChangedAdapter2 = (
  observer: Observer<Error, O.Option<UserStruct>>
): IO<void> => {
  const auth = getAuth();
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
