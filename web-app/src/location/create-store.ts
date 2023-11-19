import { ReadonlyObservable } from '@firebase-with-passkeys/observable-type';
import { pipe } from 'fp-ts/function';
import { action, observable, onBecomeObserved, onBecomeUnobserved } from 'mobx';
import { _Location, parseLocation } from './location';

export const createLocationStore = (): ReadonlyObservable<_Location> => {
  const getLocation = () => pipe(window.location.href, parseLocation);

  const box = observable.box<_Location>(getLocation(), { deep: false });

  const _updateLocation = action((location: _Location) => box.set(location));

  const updateLocation = () => pipe(getLocation(), _updateLocation);

  onBecomeObserved(box, () => {
    window.addEventListener('popstate', () => updateLocation);
  });

  onBecomeUnobserved(box, () => {
    window.removeEventListener('popstate', () => updateLocation);
  });

  return box;
};
