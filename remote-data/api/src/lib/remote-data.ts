import { createGetObservable as _createGetObservable } from '@firebase-with-passkeys/remote-data-get-observable';
import { createRealtimeObservable as _createRealtimeObservable } from '@firebase-with-passkeys/remote-data-realtime-observable';
import {
  action,
  computed,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
} from 'mobx';
export * from '@firebase-with-passkeys/remote-data-display';

const program = {
  action,
  computed,
  observable: <T>(v: T) => observable.box(v, { deep: false }),
  onBecomeObserved,
  onBecomeUnobserved,
};
export const createGetObservable = _createGetObservable(program);

export const createRealtimeObservable = _createRealtimeObservable(program);
