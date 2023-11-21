import * as RD from '@firebase-with-passkeys/remote-data';
import { pipe } from 'fp-ts/function';
import { observer } from 'mobx-react-lite';
import { getCurrentUserStore } from '../current-user/current-user-store';
import { SendSignInLinkToEmailForm } from '../sign-in-with-email-link/send-link/send-link-form';
import { SignInWithPasskey } from '../sign-in-with-passkey/sign-in-with-passkey';
import * as O from 'fp-ts/Option';

const currentUserStore = getCurrentUserStore();

export const SignInPage = observer(() => {
  return pipe(
    currentUserStore.get(),
    RD.fold(
      () => <div>Loading…</div>,
      () => <div>Loading…</div>,
      (e) => <div>Failure: {e.message}</div>,
      O.fold(
        () => (
          <div>
            <h1>Sign in</h1>
            <div>
              <SignInWithPasskey />
            </div>
            <div>
              <SendSignInLinkToEmailForm />
            </div>
          </div>
        ),
        () => <div>Your are authorized!</div>
      )
    )
  );
});
