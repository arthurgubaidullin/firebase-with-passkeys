import * as RD from '@firebase-with-passkeys/remote-data-type';
import { absurd } from 'fp-ts/function';

const INITIAL = 'initial' as const;
const FETCHING = 'fetching' as const;
const SUCCESS = 'success' as const;
const FAILURE = 'failure' as const;

interface Initial {
  readonly _tag: typeof INITIAL;
}

interface Fetching {
  readonly _tag: typeof FETCHING;
}

interface Success<A> {
  readonly _tag: typeof SUCCESS;
  readonly data: A;
}

interface Failure<E> {
  readonly _tag: typeof FAILURE;
  readonly error: E;
}

export type RemoteData<E, A> = Initial | Fetching | Success<A> | Failure<E>;

export const isInitial = <E, A>(rd: RemoteData<E, A>): rd is Initial =>
  rd._tag === INITIAL;

export const isFetching = <E, A>(rd: RemoteData<E, A>): rd is Fetching =>
  rd._tag === FETCHING;

export const isSuccess = <E, A>(rd: RemoteData<E, A>): rd is Success<A> =>
  rd._tag === SUCCESS;

export const isFailure = <E, A>(rd: RemoteData<E, A>): rd is Failure<E> =>
  rd._tag === FAILURE;

export const fold =
  <E, A, B>(
    onInitial: (remoteData: RD.Initial) => B,
    onFetching: (remoteData: RD.Fetching) => B,
    onFailure: (remoteData: RD.Failure<E>) => B,
    onSuccess: (remoteData: RD.Success<A>) => B
  ) =>
  (remoteData: RD.RemoteData<E, A>): B => {
    if (RD.isInitial(remoteData)) {
      return onInitial(remoteData);
    }
    if (RD.isFetching(remoteData)) {
      return onFetching(remoteData);
    }
    if (RD.isSuccess(remoteData)) {
      return onSuccess(remoteData);
    }
    if (RD.isFailure(remoteData)) {
      return onFailure(remoteData);
    }
    absurd(remoteData);
    throw new TypeError();
  };
