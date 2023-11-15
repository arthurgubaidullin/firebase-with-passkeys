import { getAuth } from '@firebase-with-passkeys/firebase-app-auth';
import { ReadonlyObservable } from '@firebase-with-passkeys/observable-type';
import {
  RemoteData,
  createFetchResultObservable,
} from '@firebase-with-passkeys/remote-data-get-observable';
import { signInWithEmailLink } from 'firebase/auth';
import * as E from 'fp-ts/Either';
import { constVoid } from 'fp-ts/function';
import { computed } from 'mobx';

type CompleteProcess = RemoteData<Error, { readonly email: string }>;

type CompleteProcessApi = CompleteProcess & {
  readonly complete: () => Promise<void>;
};

type CompleteSendSignInLinkToEmailStore =
  ReadonlyObservable<CompleteProcessApi>;

export const createCompleteStore = (): CompleteSendSignInLinkToEmailStore => {
  const box = createFetchResultObservable(() => async () => {
    const email = window.localStorage.getItem('email-for-sign-in') ?? '';
    try {
      await signInWithEmailLink(getAuth(), email, window.location.href);
    } catch (error) {
      return E.left(E.toError(error));
    } finally {
      window.localStorage.removeItem('email-for-sign-in');
    }
    return E.right({ email });
  });

  return computed(() => ({
    ...box.get(),
    complete: () => box.get().fetch(constVoid()),
  }));
};
