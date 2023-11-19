import { startRegistrationApi } from '@firebase-with-passkeys/passkeys-start-registration-api';
import { createGetObservable, fold } from '@firebase-with-passkeys/remote-data';
import { pipe } from 'fp-ts/function';
import { observer } from 'mobx-react-lite';
import { useId } from 'react';

const startRegistrationStore = createGetObservable(() => startRegistrationApi);

export const SaveDeviceForm = observer(() => {
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
});
