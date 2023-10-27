export interface LogError {
  readonly error: (message: string, ...args: unknown[]) => void;
}
