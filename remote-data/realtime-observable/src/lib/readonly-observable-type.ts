export interface ReadonlyObservable<A> {
  readonly get: () => A;
}
