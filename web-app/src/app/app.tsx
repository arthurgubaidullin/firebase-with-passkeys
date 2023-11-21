import * as RD from '@firebase-with-passkeys/remote-data';
import * as O from 'fp-ts/Option';
import { absurd, pipe } from 'fp-ts/function';
import { observer } from 'mobx-react-lite';
import { getCurrentUserStore } from '../current-user/current-user-store';
import { createLocationStore } from '../location/create-store';
import { SignInPage } from '../sign-in-page/sign-in-page';
import { CompleteSendSignInLinkToEmailPage } from '../sign-in-with-email-link/complete/complete-form-page';
import { UserLand } from '../user-land/user-land';
import './app.module.css';

const location = createLocationStore();

const currentUserStore = getCurrentUserStore();

export const App = observer(() => {
  const _location = location.get();
  if (_location._tag === 'SignIn') {
    return <SignInPage />;
  }
  if (_location._tag === 'CompleteSignIn') {
    return <CompleteSendSignInLinkToEmailPage />;
  }
  if (_location._tag === 'Home') {
    return pipe(
      currentUserStore.get(),
      RD.fold(
        () => <div>Loading…</div>,
        () => <div>Loading…</div>,
        (e) => <div>Failure: {e.message}</div>,
        O.fold(
          () => <SignInPage />,
          () => <UserLand />
        )
      )
    );
  }
  if (_location._tag === 'NotFound') {
    return <div>Not found!</div>;
  }
  absurd(_location);
  return null;
});

export default App;
