import * as RD from '@firebase-with-passkeys/remote-data-type';
import { absurd } from 'fp-ts/function';

export * from '@firebase-with-passkeys/remote-data-type';

export const fold =
  <E, A, B>(
    onInitial: (remoteData: RD.Initial) => B,
    onFetching: (remoteData: RD.Fetching) => B,
    onFailure: (remoteData: RD.Failure<E>) => B,
    onSuccess: (remoteData: RD.Success<A>) => B
  ) =>
  (remoteData: RD.RemoteData<E, A>): B => {
    if (RD.isInitial(remoteData)) {
      return onInitial(remoteData);
    }
    if (RD.isFetching(remoteData)) {
      return onFetching(remoteData);
    }
    if (RD.isSuccess(remoteData)) {
      return onSuccess(remoteData);
    }
    if (RD.isFailure(remoteData)) {
      return onFailure(remoteData);
    }
    absurd(remoteData);
    throw new TypeError();
  };
