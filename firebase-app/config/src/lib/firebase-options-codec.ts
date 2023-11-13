import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export const FirebaseOptionsCodec = t.readonly(
  t.strict({
    apiKey: NonEmptyString,
    authDomain: NonEmptyString,
    projectId: NonEmptyString,
    storageBucket: NonEmptyString,
    messagingSenderId: NonEmptyString,
    appId: NonEmptyString,
    measurementId: NonEmptyString,
  })
);
