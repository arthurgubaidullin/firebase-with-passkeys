import { createGetObservable } from '@firebase-with-passkeys/remote-data';
import { startAuthenticationApi } from '@firebase-with-passkeys/passkeys-start-authentication-api';
import { pipe } from 'fp-ts/function';
import { observer } from 'mobx-react-lite';
import { fold } from '@firebase-with-passkeys/remote-data';

const startAuthenticationProcess = createGetObservable(startAuthenticationApi);

export const SignInWithPasskey = observer(() => {
  const process = startAuthenticationProcess.get();

  const form = (
    <div>
      <h1>Sign in with a Passkey</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const fd = new FormData(e.currentTarget);
          const username = fd.get('username')?.toString();

          if (username) {
            await process.fetch(username);
          }
        }}
      >
        <label>
          Username:
          <input
            type="text"
            name="username"
            autoComplete="username webauthn"
            required
          />
        </label>
        <br />
        <input type="submit" value="Sign in with a passkey" />
      </form>
    </div>
  );

  return pipe(
    process,
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
