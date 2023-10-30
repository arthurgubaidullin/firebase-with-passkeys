import { LogError } from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { IO } from 'fp-ts/IO';

export const logUnknownError =
  (P: LogError) =>
  <E>(e: E): IO<void> =>
  () => {
    if (e instanceof Error) {
      P.error(e.message, e);
    }
  };
