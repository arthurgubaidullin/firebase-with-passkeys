import { observer } from 'mobx-react-lite';
import { createLocationStore } from '../location/create-store';
import { completeSignIn, signIn } from '../location/location';
import { CompleteSendSignInLinkToEmailPage } from '../sign-in-with-email-link/complete/complete-form-page';
import { SendSignInLinkToEmailForm } from '../sign-in-with-email-link/send-link/send-link-form';
import './app.module.css';

const location = createLocationStore();

export const App = observer(() => {
  const _location = location.get();
  if (_location === signIn) {
    return <SendSignInLinkToEmailForm />;
  }
  if (_location === completeSignIn) {
    return <CompleteSendSignInLinkToEmailPage />;
  }

  return <div>test</div>;
});

export default App;
