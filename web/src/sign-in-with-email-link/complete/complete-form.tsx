import * as FR from '@firebase-with-passkeys/remote-data-type';
import { pipe } from 'fp-ts/function';
import { observer } from 'mobx-react-lite';
import { createCompleteStore } from './complete-store';
import { useEffect } from 'react';

const store = createCompleteStore();

export const CompleteSendSignInLinkToEmailForm = observer(() => {
  useEffect(() => {
    store.get().complete();
  }, []);
  return pipe(
    store.get(),
    FR.fold(
      () => <div />,
      () => <div>Fetching…</div>,
      (e) => (
        <div>
          Failure: <pre>{e.error.message}</pre>
        </div>
      ),
      () => <div>Success!!1</div>
    )
  );
});
