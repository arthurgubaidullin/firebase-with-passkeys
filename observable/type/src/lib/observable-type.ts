export interface ReadonlyObservable<T> {
  readonly get: () => T;
}

export interface Observable<T> extends ReadonlyObservable<T> {
  readonly set: (value: T) => void;
}

export interface CreateObservable {
  readonly observable: <T>(initial: T) => Observable<T>;
}

export interface CreateAction {
  readonly action: <F>(f: F) => F;
}

export interface OnBecomeObserved {
  readonly onBecomeObserved: <T>(
    observable: Observable<T>,
    f: () => void
  ) => void;
}

export interface CreateComputedObservable {
  readonly computed: <T>(f: () => T) => ReadonlyObservable<T>;
}

export interface OnBecomeUnobserved {
  readonly onBecomeUnobserved: <T>(
    observable: Observable<T>,
    f: () => void
  ) => void;
}
