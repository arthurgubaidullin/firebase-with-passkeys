export interface LogError {
  error: (message: string, ...args: unknown[]) => void;
}
