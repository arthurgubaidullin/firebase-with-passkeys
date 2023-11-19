import {
  CreateAction,
  CreateComputedObservable,
  CreateObservable,
  OnBecomeObserved,
  OnBecomeUnobserved,
} from '@firebase-with-passkeys/observable-type';
import { RemoteData } from '@firebase-with-passkeys/remote-data-display';
import * as RDG from '@firebase-with-passkeys/remote-data-get';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { constVoid, pipe } from 'fp-ts/function';

type ReadonlyObservable<A> = { readonly get: () => A };

type RemoteDataApi<I, E, A> = RemoteData<E, A> & {
  readonly fetch: (i: I) => Promise<void>;
};

export const createGetObservable =
  (
    P: CreateObservable &
      CreateComputedObservable &
      CreateAction &
      OnBecomeObserved &
      OnBecomeUnobserved
  ) =>
  <I, E, A>(
    f: (i: I) => TE.TaskEither<E, A>
  ): ReadonlyObservable<RemoteDataApi<I, E, A>> => {
    const box = P.observable<RemoteData<E, A>>(RDG.initial);

    const fetch = P.action(() =>
      pipe(
        box.get(),
        RDG.fetch,
        O.map((r) => box.set(r))
      )
    );
    const success = P.action((a: A) =>
      pipe(
        box.get(),
        RDG.success<E, A>(a),
        O.map((r) => box.set(r))
      )
    );
    const failure = P.action((e: E) =>
      pipe(
        box.get(),
        RDG.failure<E, A>(e),
        O.map((r) => box.set(r))
      )
    );

    const _fetch = (i: I) =>
      pipe(
        fetch(),
        TO.fromOption,
        TO.chain(() => pipe(f(i), T.map(E.fold(failure, success)))),
        T.map(constVoid),
        (t) => t()
      );

    return P.computed(() => ({
      ...box.get(),
      fetch: _fetch,
    }));
  };
