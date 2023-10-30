import { getOrInitializeApp as _getOrInitializeApp } from '@firebase-with-passkeys/firebase-app-client';
import { firebaseConfig } from './сonfig';

export const getOrInitializeApp = () => _getOrInitializeApp(firebaseConfig);
