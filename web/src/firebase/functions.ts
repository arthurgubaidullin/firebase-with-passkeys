import { FirebaseApp } from 'firebase/app';
import {
  getFunctions as _getFunctions,
  connectFunctionsEmulator,
} from 'firebase/functions';

export const getFunctions = (app: FirebaseApp) => {
  const functions = _getFunctions(app);
  if (['127.0.0.1', 'localhost'].includes(window.location.hostname)) {
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  }
  return functions;
};
