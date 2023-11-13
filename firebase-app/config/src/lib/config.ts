import { FirebaseOptions } from 'firebase/app';
import * as O from 'fp-ts/Option';
import { identity, pipe } from 'fp-ts/function';
import { FirebaseOptionsCodec } from './firebase-options-codec';

const unverified: FirebaseOptions = {
  apiKey: import.meta.env['VITE_API_KEY'],
  authDomain: import.meta.env['VITE_AUTH_DOMAIN'],
  projectId: import.meta.env['VITE_PROJECT_ID'],
  storageBucket: import.meta.env['VITE_STORAGE_BUCKET'],
  messagingSenderId: import.meta.env['VITE_MESSAGING_SENDER_ID'],
  appId: import.meta.env['VITE_APP_ID'],
  measurementId: import.meta.env['VITE_MEASUREMENT_ID'],
};

const verified = pipe(
  unverified,
  O.fromPredicate(FirebaseOptionsCodec.is),
  O.fold(() => {
    throw new Error('The firebase configuration is invalid.');
  }, identity)
);

export const getFirebaseConfig = (): FirebaseOptions => {
  return pipe(verified);
};
