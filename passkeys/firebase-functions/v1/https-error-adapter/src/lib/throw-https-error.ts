import { HttpsError } from 'firebase-functions/v1/https';
import { Task } from 'fp-ts/Task';

export const throwHttpsError =
  (e: HttpsError): Task<never> =>
  async () => {
    throw e;
  };
