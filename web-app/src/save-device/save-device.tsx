import { createGetObservable, fold } from '@firebase-with-passkeys/remote-data';
import { startRegistrationApi } from '@firebase-with-passkeys/passkeys-start-registration-api';
import { useId } from 'react';
import { pipe } from 'fp-ts/function';

const startRegistrationStore = createGetObservable(() => startRegistrationApi);

export const SaveDeviceForm = () => {
  const id = useId();
  const process = startRegistrationStore.get();

  const form = (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        await process.fetch(void 0);
      }}
    >
      <div>
        <label htmlFor={id}>Save device?</label>
        <input id={id} type="checkbox" required />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
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
};
