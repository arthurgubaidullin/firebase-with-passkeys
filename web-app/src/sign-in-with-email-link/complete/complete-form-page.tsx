import { fold } from '@firebase-with-passkeys/remote-data';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { observer } from 'mobx-react-lite';
import { createCurrentUser } from '../../current-user/current-user-store';
import { CompleteSendSignInLinkToEmailForm } from './complete-form';
import { SaveDeviceForm } from '../../save-device/save-device';

const currentUserStore = createCurrentUser();

export const CompleteSendSignInLinkToEmailPage = observer(() => {
  return pipe(
    currentUserStore.get(),
    fold(
      () => <div />,
      () => <div>Fetching…</div>,
      (e) => (
        <div>
          Failure: <pre>{e.message}</pre>
        </div>
      ),
      O.fold(
        () => <CompleteSendSignInLinkToEmailForm />,
        () => <SaveDeviceForm />
      )
    )
  );
});
