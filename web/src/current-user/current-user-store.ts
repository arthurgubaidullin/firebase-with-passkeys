import { createAuthStateStoreApi } from '@firebase-with-passkeys/auth-create-store-api';
import { firebaseConfig } from '../firebase/сonfig';
import { getOrInitializeApp } from '@firebase-with-passkeys/get-or-initialize-firebase-app';

export const createCurrentUser = () =>
  createAuthStateStoreApi(getOrInitializeApp(firebaseConfig));
