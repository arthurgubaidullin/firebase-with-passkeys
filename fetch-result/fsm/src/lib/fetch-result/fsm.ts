import * as FR from '@firebase-with-passkeys/fetch-result-type';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
export {
  isFailure,
  isFetching,
  isInitial,
  isSuccess,
  FetchResult,
  fold,
} from '@firebase-with-passkeys/fetch-result-type';

export const initial = FR.initial;

export const fetch = <E, A>(
  r: FR.FetchResult<E, A>
): O.Option<FR.FetchResult<E, A>> =>
  pipe(
    r,
    O.fromPredicate(FR.isInitial),
    O.map(() => FR.fetching)
  );

export const success =
  <E, A>(a: A) =>
  (r: FR.FetchResult<E, A>): O.Option<FR.FetchResult<E, A>> =>
    pipe(
      r,
      O.fromPredicate(FR.isFetching),
      O.map(() => FR.success(a))
    );

export const failure =
  <E, A>(e: E) =>
  (r: FR.FetchResult<E, A>): O.Option<FR.FetchResult<E, A>> =>
    pipe(
      r,
      O.fromPredicate(FR.isFetching),
      O.map(() => FR.failure(e))
    );
