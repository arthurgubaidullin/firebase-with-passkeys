const INITIAL = 'initial' as const;
const FETCHING = 'fetching' as const;
const SUCCESS = 'success' as const;
const FAILURE = 'failure' as const;

export interface Initial {
  readonly _tag: typeof INITIAL;
}

export interface Fetching {
  readonly _tag: typeof FETCHING;
}

export interface Success<A> {
  readonly _tag: typeof SUCCESS;
  readonly data: A;
}

export interface Failure<E> {
  readonly _tag: typeof FAILURE;
  readonly error: E;
}

export type FetchResult<E, A> = Initial | Fetching | Success<A> | Failure<E>;

export const isInitial = <E, A>(
  process: FetchResult<E, A>
): process is Initial => process._tag === INITIAL;

export const isFetching = <E, A>(
  process: FetchResult<E, A>
): process is Fetching => process._tag === FETCHING;

export const isSuccess = <E, A>(
  process: FetchResult<E, A>
): process is Success<A> => process._tag === SUCCESS;

export const isFailure = <E, A>(
  process: FetchResult<E, A>
): process is Failure<E> => process._tag === FAILURE;

export const initial: Initial = Object.freeze({
  _tag: INITIAL,
});

export const fetching: Fetching = Object.freeze({
  _tag: FETCHING,
});

export const success = <A>(data: A): Success<A> =>
  Object.freeze({
    _tag: SUCCESS,
    data: data,
  });

export const failure = <E>(error: E): Failure<E> =>
  Object.freeze({
    _tag: FAILURE,
    error,
  });
