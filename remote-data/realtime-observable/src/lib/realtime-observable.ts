import * as FSM from '@firebase-with-passkeys/remote-data-realtime-fsm';
import * as O from 'fp-ts/Option';
import { constVoid, pipe } from 'fp-ts/function';
import { Observer } from './observer-type';
import { ReadonlyObservable } from './readonly-observable-type';
import { Unsubscribe } from './unsubscribe-type';
import { RemoteData } from '@firebase-with-passkeys/remote-data-display';
import {
  CreateObservable,
  CreateComputedObservable,
  CreateAction,
  OnBecomeObserved,
  OnBecomeUnobserved,
} from '@firebase-with-passkeys/observable-type';

export const createRealtimeObservable =
  (
    P: CreateObservable &
      CreateComputedObservable &
      CreateAction &
      OnBecomeObserved &
      OnBecomeUnobserved
  ) =>
  <E, A>(
    subscribe: (observer: Observer<E, A>) => Unsubscribe
  ): ReadonlyObservable<RemoteData<E, A>> => {
    const box = P.observable<RemoteData<E, A>>(FSM.initial);

    const fetch: () => O.Option<void> = P.action(() =>
      pipe(
        box.get(),
        FSM.fetch,
        O.map((r) => box.set(r))
      )
    );
    const successOrNext: (a: A) => O.Option<void> = P.action((a: A) =>
      pipe(
        box.get(),
        FSM.success<E, A>(a),
        O.map((r) => box.set(r))
      )
    );
    const failure: (e: E) => O.Option<void> = P.action((e: E) =>
      pipe(
        box.get(),
        FSM.failure<E, A>(e),
        O.map((r) => box.set(r))
      )
    );

    const _subscribe = (): Unsubscribe =>
      pipe(
        fetch(),
        O.map(
          (): Unsubscribe =>
            subscribe({
              next: (a) => {
                successOrNext(a);
              },
              error: (e) => {
                failure(e);
              },
              complete: () => {
                box.set(FSM.initial);
              },
            })
        ),
        O.map(
          (f): Unsubscribe =>
            () => {
              box.set(FSM.initial);
              f();
            }
        ),
        O.getOrElse(() => constVoid)
      );

    let unsubscribe: Unsubscribe;

    P.onBecomeObserved(box, () => {
      unsubscribe = _subscribe();
    });

    P.onBecomeUnobserved(box, () => {
      unsubscribe();
    });

    return box;
  };
