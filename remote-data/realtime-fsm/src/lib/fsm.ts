import * as RD from '@firebase-with-passkeys/remote-data-type';
import * as O from 'fp-ts/Option';
import { or } from 'fp-ts/Refinement';
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
      O.fromPredicate(pipe(RD.isFetching, or(RD.isSuccess), or(RD.isFailure))),
      O.map(() => RD.success(a))
    );

export const failure =
  <E, A>(e: E) =>
  (rd: RD.RemoteData<E, A>): O.Option<RD.RemoteData<E, A>> =>
    pipe(
      rd,
      O.fromPredicate(pipe(RD.isFetching, or(RD.isSuccess), or(RD.isFailure))),
      O.map(() => RD.failure(e))
    );
