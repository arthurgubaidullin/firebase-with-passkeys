import { FirebaseApp } from 'firebase/app';
import { getAuth as _getAuth, connectAuthEmulator } from 'firebase/auth';

export const getAuth = (app: FirebaseApp) => {
  const auth = _getAuth(app);
  if (['127.0.0.1', 'localhost'].includes(window.location.hostname)) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  }
  return auth;
};
