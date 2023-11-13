import { getFirebaseApp } from '@firebase-with-passkeys/firebase-app-instance';
import {
  getFunctions as _getFunctions,
  connectFunctionsEmulator,
} from 'firebase/functions';

const LOCAL_HOSTS = ['127.0.0.1', 'localhost'];
const EMULATOR_HOST = '127.0.0.1';
const EMULATOR_PORT = 5001;

export const getFunctions = () => {
  const app = getFirebaseApp();
  const functions = _getFunctions(app);
  if (LOCAL_HOSTS.includes(window.location.hostname)) {
    connectFunctionsEmulator(functions, EMULATOR_HOST, EMULATOR_PORT);
  }
  return functions;
};
