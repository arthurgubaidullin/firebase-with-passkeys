import {
  createFetchResultObservable,
  FetchResult,
} from '@firebase-with-passkeys/fetch-result-observable';
import { ReadonlyObservable } from '@firebase-with-passkeys/observable-type';
import { sendSignInLinkToEmail } from 'firebase/auth';
import * as E from 'fp-ts/Either';
import { computed } from 'mobx';
import { getOrInitializeApp } from '../../firebase/app';
import { getAuth } from '../../firebase/auth';
import { actionCodeSettings } from '../action-code-settings';
import { constVoid } from 'fp-ts/function';

type SendSignInLinkToEmailApi = FetchResult<Error, void> & {
  readonly send: (email: string) => Promise<void>;
};

type SendSignInLinkToEmailStore = ReadonlyObservable<SendSignInLinkToEmailApi>;

export const createSendLinkStore = (): SendSignInLinkToEmailStore => {
  const box = createFetchResultObservable((email: string) => async () => {
    try {
      await sendSignInLinkToEmail(
        getAuth(getOrInitializeApp()),
        email,
        actionCodeSettings
      );
    } catch (error) {
      return E.left(E.toError(error));
    }
    window.localStorage.setItem('email-for-sign-in', email);
    return E.right(constVoid());
  });

  return computed((): SendSignInLinkToEmailApi => {
    const { fetch: send, ...data } = box.get();
    return {
      ...data,
      send,
    };
  });
};
