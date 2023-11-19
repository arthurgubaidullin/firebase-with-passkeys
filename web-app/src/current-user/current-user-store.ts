import { createAuthStateStoreApi2 } from '@firebase-with-passkeys/auth-create-store-api';
import { getFirebaseApp } from '@firebase-with-passkeys/firebase-app-instance';

export const getCurrentUserStore = () =>
  createAuthStateStoreApi2(getFirebaseApp());
