import { LogError } from '@firebase-with-passkeys/logger-type-server';
import { IO } from 'fp-ts/IO';

export const logUnknownError =
  (P: LogError) =>
  <E>(e: E): IO<void> =>
  () => {
    if (e instanceof Error) {
      P.error(e.message, e);
    }
  };
