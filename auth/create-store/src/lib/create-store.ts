import * as AuthState from '@firebase-with-passkeys/auth-state';
import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import {
  CreateAction,
  CreateObservable,
  OnBecomeObserved,
  OnBecomeUnobserved,
  ReadonlyObservable,
} from '@firebase-with-passkeys/observable-type';
import { OnAuthStateChanged } from './on-auth-state-changed-type';
import { Unsubscribe } from './unsubscribe-type';

export const createStore = (
  P: OnAuthStateChanged &
    CreateObservable &
    CreateAction &
    OnBecomeObserved &
    OnBecomeUnobserved
): ReadonlyObservable<AuthState.AuthState> => {
  const value = P.observable<AuthState.AuthState>(AuthState.initial);

  const fetching = P.action(() =>
    pipe(value.get(), AuthState.startFetching, (a) => value.set(a))
  );

  const success = P.action((u: UserStruct) =>
    pipe(value.get(), AuthState.userAuthorized(u), (a) => value.set(a))
  );

  const failure = P.action(() =>
    pipe(value.get(), AuthState.userNotAuthorized, (a) => value.set(a))
  );

  const unsubscribes: Unsubscribe[] = [];

  P.onBecomeObserved(value, () => {
    fetching();
    const unsubscribe = P.onAuthStateChanged(O.fold(failure, success));
    unsubscribes.push(unsubscribe);
  });

  P.onBecomeUnobserved(value, () => {
    while (unsubscribes.length !== 0) {
      const unsubscribe = unsubscribes.pop();
      unsubscribe?.();
    }
  });

  return value;
};
