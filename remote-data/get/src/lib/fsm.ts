import * as RD from '@firebase-with-passkeys/remote-data-type';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
export {
  fold,
  isFailure,
  isFetching,
  isInitial,
  isSuccess,
} from '@firebase-with-passkeys/remote-data-type';
export type { RemoteData } from '@firebase-with-passkeys/remote-data-type';

export const initial = RD.initial;

export const fetch = <E, A>(
  r: RD.RemoteData<E, A>
): O.Option<RD.RemoteData<E, A>> =>
  pipe(
    r,
    O.fromPredicate(RD.isInitial),
    O.map(() => RD.fetching)
  );

export const success =
  <E, A>(a: A) =>
  (r: RD.RemoteData<E, A>): O.Option<RD.RemoteData<E, A>> =>
    pipe(
      r,
      O.fromPredicate(RD.isFetching),
      O.map(() => RD.success(a))
    );

export const failure =
  <E, A>(e: E) =>
  (r: RD.RemoteData<E, A>): O.Option<RD.RemoteData<E, A>> =>
    pipe(
      r,
      O.fromPredicate(RD.isFetching),
      O.map(() => RD.failure(e))
    );
