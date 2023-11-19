import { createSendLinkStore } from '@firebase-with-passkeys/auth-sign-in-with-email-link';
import { fold } from '@firebase-with-passkeys/remote-data';
import { pipe } from 'fp-ts/function';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useId } from 'react';

const URL: string = `${import.meta.env['VITE_HOST'] ?? ''}/sign-in/complete`;

const store = createSendLinkStore(URL);

autorun(() => {
  console.log(store.get());
});

export const SendSignInLinkToEmailForm = observer(() => {
  const id = useId();
  const state = store.get();
  const form = (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const email = fd.get('email')?.toString() ?? '';
        await state.send(email);
      }}
    >
      <div>
        <label htmlFor={id}>Email:</label>
        <input id={id} type="email" datatype="email" name="email" required />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
  return pipe(
    state,
    fold(
      () => form,
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
