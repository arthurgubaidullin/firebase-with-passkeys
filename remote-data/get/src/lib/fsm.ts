import * as RD from '@firebase-with-passkeys/remote-data-type';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

export const initial = RD.initial;

export const fetch = <E, A>(
  rd: RD.RemoteData<E, A>
): O.Option<RD.RemoteData<E, A>> =>
  pipe(
    rd,
    O.fromPredicate(RD.isInitial),
    O.map(() => RD.fetching)
  );

export const success =
  <E, A>(a: A) =>
  (rd: RD.RemoteData<E, A>): O.Option<RD.RemoteData<E, A>> =>
    pipe(
      rd,
      O.fromPredicate(RD.isFetching),
      O.map(() => RD.success(a))
    );

export const failure =
  <E, A>(e: E) =>
  (rd: RD.RemoteData<E, A>): O.Option<RD.RemoteData<E, A>> =>
    pipe(
      rd,
      O.fromPredicate(RD.isFetching),
      O.map(() => RD.failure(e))
    );
