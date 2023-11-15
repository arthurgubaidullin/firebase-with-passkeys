import * as FRO from '@firebase-with-passkeys/remote-data-get-observable';
import { startAuthenticationApi } from '@firebase-with-passkeys/passkeys-start-authentication-api';
import { pipe } from 'fp-ts/function';
import { observer } from 'mobx-react-lite';

const startAuthenticationProcess = FRO.createFetchResultObservable(
  startAuthenticationApi
);

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
    FRO.fold(
      () => form,
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
