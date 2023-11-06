import * as E from 'fp-ts/Either';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { constVoid, pipe } from 'fp-ts/function';
import { action, computed, observable } from 'mobx';
import * as FR from '@firebase-with-passkeys/fetch-result-fsm';

type ReadonlyObservable<A> = { readonly get: () => A };

type FetchResultApi<I, E, A> = FR.FetchResult<E, A> & {
  readonly fetch: (i: I) => Promise<void>;
};

export const createFetchResultObservable = <I, E, A>(
  f: (i: I) => TE.TaskEither<E, A>
): ReadonlyObservable<FetchResultApi<I, E, A>> => {
  const box = observable.box(FR.initial, { deep: false });

  const fetch = action(() => FR.fetch<E, A>(box.get()));
  const success = action((a: A) => FR.success<E, A>(a)(box.get()));
  const failure = action((e: E) => FR.failure<E, A>(e)(box.get()));

  const makeFetcher =
    <I>(f: (i: I) => TE.TaskEither<E, A>) =>
    (i: I) =>
      pipe(
        fetch(),
        TO.fromOption,
        TO.chain(() => pipe(f(i), T.map(E.fold(failure, success)))),
        T.map(constVoid),
        (t) => t()
      );

  return computed(() => ({
    ...box.get(),
    fetch: makeFetcher<I>(f),
  }));
};
