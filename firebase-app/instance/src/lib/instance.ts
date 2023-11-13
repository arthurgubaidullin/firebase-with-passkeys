import { getFirebaseConfig } from '@firebase-with-passkeys/firebase-app-config';
import { getOrInitializeApp } from '@firebase-with-passkeys/get-or-initialize-firebase-app';

export const getFirebaseApp = () => getOrInitializeApp(getFirebaseConfig());
