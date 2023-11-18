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
    onInitial: (remoteData: Initial) => B,
    onFetching: (remoteData: Fetching) => B,
    onFailure: (remoteData: Failure<E>) => B,
    onSuccess: (remoteData: Success<A>) => B
  ) =>
  (remoteData: RemoteData<E, A>): B => {
    if (isInitial(remoteData)) {
      return onInitial(remoteData);
    }
    if (isFetching(remoteData)) {
      return onFetching(remoteData);
    }
    if (isSuccess(remoteData)) {
      return onSuccess(remoteData);
    }
    if (isFailure(remoteData)) {
      return onFailure(remoteData);
    }
    absurd(remoteData);
    throw new TypeError();
  };
