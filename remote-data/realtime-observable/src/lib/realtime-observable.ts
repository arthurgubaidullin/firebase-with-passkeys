import * as FSM from '@firebase-with-passkeys/remote-data-realtime-fsm';
import * as O from 'fp-ts/Option';
import { constVoid, pipe } from 'fp-ts/function';
import { action, observable, onBecomeObserved, onBecomeUnobserved } from 'mobx';
import { Observer } from './observer-type';
import { ReadonlyObservable } from './readonly-observable-type';
import { Unsubscribe } from './unsubscribe-type';
export {
  fold,
  isFailure,
  isFetching,
  isInitial,
  isSuccess,
} from '@firebase-with-passkeys/remote-data-realtime-fsm';
export type { RemoteData } from '@firebase-with-passkeys/remote-data-realtime-fsm';

export const createRealtimeObservable = <E, A>(
  subscribe: (observer: Observer<E, A>) => Unsubscribe
): ReadonlyObservable<FSM.RemoteData<E, A>> => {
  const box = observable.box<FSM.RemoteData<E, A>>(FSM.initial, {
    deep: false,
  });

  const fetch: () => O.Option<void> = action(() =>
    pipe(
      box.get(),
      FSM.fetch,
      O.map((r) => box.set(r))
    )
  );
  const successOrNext: (a: A) => O.Option<void> = action((a: A) =>
    pipe(
      box.get(),
      FSM.success<E, A>(a),
      O.map((r) => box.set(r))
    )
  );
  const failure: (e: E) => O.Option<void> = action((e: E) =>
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

  onBecomeObserved(box, () => {
    unsubscribe = _subscribe();
  });

  onBecomeUnobserved(box, () => {
    unsubscribe();
  });

  return box;
};
