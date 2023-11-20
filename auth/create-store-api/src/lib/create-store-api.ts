import { UserStruct } from '@firebase-with-passkeys/auth-user-struct';
import { ReadonlyObservable } from '@firebase-with-passkeys/observable-type';
import { createRealtimeObservable } from '@firebase-with-passkeys/remote-data';
import { RemoteData } from '@firebase-with-passkeys/remote-data-display';
import { Option } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { onAuthStateChangedAdapter2 } from './on-auth-state-changed-adapter';

export const createAuthStateStoreApi = (): ReadonlyObservable<
  RemoteData<Error, Option<UserStruct>>
> => pipe(onAuthStateChangedAdapter2, createRealtimeObservable);
