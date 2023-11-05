import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';

const UNDEFINED = 'undefined' as const;
const FETCHING = 'fetching' as const;
const AUTHORIZED = 'authorized' as const;
const NOT_AUTHORIZED = 'not-authorized' as const;

interface Undefined {
  readonly _tag: typeof UNDEFINED;
}

interface Fetching {
  readonly _tag: typeof FETCHING;
}

interface Authorized {
  readonly _tag: typeof AUTHORIZED;
  readonly currentUser: UserStruct;
}

interface NotAuthorized {
  readonly _tag: typeof NOT_AUTHORIZED;
}

export type AuthState = Undefined | Fetching | Authorized | NotAuthorized;

export const isUndefined = (a: AuthState): a is Undefined =>
  a._tag === UNDEFINED;

export const isFetching = (a: AuthState): a is Fetching => a._tag === FETCHING;

export const isAuthorized = (a: AuthState): a is Authorized =>
  a._tag === AUTHORIZED;

export const isNotAuthorized = (a: AuthState): a is NotAuthorized =>
  a._tag === NOT_AUTHORIZED;

export const initial: Undefined = Object.freeze({ _tag: UNDEFINED });

const fetching: Fetching = Object.freeze({ _tag: FETCHING });

const authorized = (user: UserStruct): Authorized => ({
  _tag: AUTHORIZED,
  currentUser: user,
});

const notAuthorized: NotAuthorized = Object.freeze({
  _tag: NOT_AUTHORIZED,
});

export const startFetching = (a: AuthState): AuthState =>
  isUndefined(a) ? fetching : a;

export const userAuthorized =
  (user: UserStruct) =>
  (state: AuthState): AuthState =>
    isFetching(state) || isNotAuthorized(state) ? authorized(user) : state;

export const userNotAuthorized = (state: AuthState): AuthState =>
  isFetching(state) ? notAuthorized : state;
