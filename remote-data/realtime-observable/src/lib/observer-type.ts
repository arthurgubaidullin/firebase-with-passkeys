export interface Observer<E, A> {
  readonly next?: (value: A) => void;
  readonly error?: (error: E) => void;
  readonly complete?: () => void;
}
