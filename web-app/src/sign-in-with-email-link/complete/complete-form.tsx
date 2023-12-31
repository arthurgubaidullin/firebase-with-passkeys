import { createCompleteStore } from '@firebase-with-passkeys/auth-sign-in-with-email-link';
import { fold } from '@firebase-with-passkeys/remote-data';
import { pipe } from 'fp-ts/function';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const store = createCompleteStore();

export const CompleteSendSignInLinkToEmailForm = observer(() => {
  useEffect(() => {
    store.get().complete();
  }, []);
  return pipe(
    store.get(),
    fold(
      () => <div />,
      () => <div>Fetching…</div>,
      (e) => (
        <div>
          Failure: <pre>{e.message}</pre>
        </div>
      ),
      () => <div>Success!!1</div>
    )
  );
});
