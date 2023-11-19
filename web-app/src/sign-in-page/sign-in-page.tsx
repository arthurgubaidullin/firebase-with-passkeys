import { observer } from 'mobx-react-lite';
import { SignInWithPasskey } from '../sign-in-with-passkey/sign-in-with-passkey';
import { SendSignInLinkToEmailForm } from '../sign-in-with-email-link/send-link/send-link-form';

export const SignInPage = observer(() => {
  return (
    <div>
      <h1>Sign in</h1>
      <div>
        <SignInWithPasskey />
      </div>
      <div>
        <SendSignInLinkToEmailForm />
      </div>
    </div>
  );
});
