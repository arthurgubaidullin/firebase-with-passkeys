import { createAuthStateStoreApi } from '@firebase-with-passkeys/auth-create-store-api';
import { getFirebaseApp } from '@firebase-with-passkeys/firebase-app-instance';

export const createCurrentUser = () =>
  createAuthStateStoreApi(getFirebaseApp());
