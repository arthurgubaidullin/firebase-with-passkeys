import { getAuth } from '@firebase-with-passkeys/firebase-app-auth';
import { ReadonlyObservable } from '@firebase-with-passkeys/observable-type';
import { createGetObservable } from '@firebase-with-passkeys/remote-data-get-observable';
import { sendSignInLinkToEmail } from 'firebase/auth';
import * as E from 'fp-ts/Either';
import { constVoid } from 'fp-ts/function';
import { computed } from 'mobx';
import { actionCodeSettings } from '../action-code-settings';
import { RemoteData } from '@firebase-with-passkeys/remote-data';

type SendSignInLinkToEmailApi = RemoteData<Error, void> & {
  readonly send: (email: string) => Promise<void>;
};

type SendSignInLinkToEmailStore = ReadonlyObservable<SendSignInLinkToEmailApi>;

export const createSendLinkStore = (): SendSignInLinkToEmailStore => {
  const box = createGetObservable((email: string) => async () => {
    try {
      await sendSignInLinkToEmail(getAuth(), email, actionCodeSettings);
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
