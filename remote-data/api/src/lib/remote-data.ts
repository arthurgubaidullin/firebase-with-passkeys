import { createGetObservable as _createGetObservable } from '@firebase-with-passkeys/remote-data-get-observable';
import {
  action,
  computed,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
} from 'mobx';
export * from '@firebase-with-passkeys/remote-data-display';
export * from '@firebase-with-passkeys/remote-data-realtime-observable';

export const createGetObservable = _createGetObservable({
  action,
  computed,
  observable: (v) => observable.box(v, { deep: false }),
  onBecomeObserved,
  onBecomeUnobserved,
});
