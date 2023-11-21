import { getFirebaseApp } from '@firebase-with-passkeys/firebase-app-instance';
import { Auth, getAuth as _getAuth, connectAuthEmulator } from 'firebase/auth';

const LOCAL_HOSTS = ['127.0.0.1', 'localhost'];
const EMULATOR_HOST = 'http://127.0.0.1:9099';

let auth: Auth | null = null;

export const getAuth = () => {
  if (!auth) {
    const app = getFirebaseApp();
    auth = _getAuth(app);
    if (LOCAL_HOSTS.includes(window.location.hostname)) {
      connectAuthEmulator(auth, EMULATOR_HOST);
    }
  }
  return auth;
};
