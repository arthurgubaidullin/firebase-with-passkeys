import * as FR from '@firebase-with-passkeys/remote-data-type';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
export {
  isFailure,
  isFetching,
  isInitial,
  isSuccess,
  fold,
} from '@firebase-with-passkeys/remote-data-type';
export type { RemoteData as FetchResult } from '@firebase-with-passkeys/remote-data-type';

export const initial = FR.initial;

export const fetch = <E, A>(
  r: FR.RemoteData<E, A>
): O.Option<FR.RemoteData<E, A>> =>
  pipe(
    r,
    O.fromPredicate(FR.isInitial),
    O.map(() => FR.fetching)
  );

export const success =
  <E, A>(a: A) =>
  (r: FR.RemoteData<E, A>): O.Option<FR.RemoteData<E, A>> =>
    pipe(
      r,
      O.fromPredicate(FR.isFetching),
      O.map(() => FR.success(a))
    );

export const failure =
  <E, A>(e: E) =>
  (r: FR.RemoteData<E, A>): O.Option<FR.RemoteData<E, A>> =>
    pipe(
      r,
      O.fromPredicate(FR.isFetching),
      O.map(() => FR.failure(e))
    );
