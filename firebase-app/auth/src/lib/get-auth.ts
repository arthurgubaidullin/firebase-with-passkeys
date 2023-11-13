import { getFirebaseApp } from '@firebase-with-passkeys/firebase-app-instance';
import { getAuth as _getAuth, connectAuthEmulator } from 'firebase/auth';

const LOCAL_HOSTS = ['127.0.0.1', 'localhost'];
const EMULATOR_HOST = 'http://127.0.0.1:9099';

export const getAuth = () => {
  const app = getFirebaseApp();
  const auth = _getAuth(app);
  if (LOCAL_HOSTS.includes(window.location.hostname)) {
    connectAuthEmulator(auth, EMULATOR_HOST);
  }
  return auth;
};
