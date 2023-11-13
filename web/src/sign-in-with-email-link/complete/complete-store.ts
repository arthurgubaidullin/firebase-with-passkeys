import {
  FetchResult,
  createFetchResultObservable,
} from '@firebase-with-passkeys/fetch-result-observable';
import { ReadonlyObservable } from '@firebase-with-passkeys/observable-type';
import { signInWithEmailLink } from 'firebase/auth';
import * as E from 'fp-ts/Either';
import { constVoid } from 'fp-ts/function';
import { computed } from 'mobx';
import { getOrInitializeApp } from '../../firebase/app';
import { getAuth } from '../../firebase/auth';

type CompleteProcess = FetchResult<Error, { readonly email: string }>;

type CompleteProcessApi = CompleteProcess & {
  readonly complete: () => Promise<void>;
};

type CompleteSendSignInLinkToEmailStore =
  ReadonlyObservable<CompleteProcessApi>;

export const createCompleteStore = (): CompleteSendSignInLinkToEmailStore => {
  const box = createFetchResultObservable(() => async () => {
    const email = window.localStorage.getItem('email-for-sign-in') ?? '';
    try {
      await signInWithEmailLink(
        getAuth(getOrInitializeApp()),
        email,
        window.location.href
      );
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
