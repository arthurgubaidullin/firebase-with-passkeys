import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { AuthenticatorRepository } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { Firestore, Timestamp, getFirestore } from 'firebase-admin/firestore';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { flow, pipe } from 'fp-ts/function';

const getRef = (db: Firestore) => (userId: string) =>
  db.collection('users').doc(userId).collection('authenticators');

export const getAuthenticatorRepository = (): AuthenticatorRepository => {
  const db = getFirestore();
  const _getRef = getRef(db);
  return {
    createAuthenticator: async (userId, authenticator) => {
      await _getRef(userId).add(AuthenticatorDocument.encode(authenticator));
    },
    updateAuthenticator:
      (userId, authenticatorId, updateAt) => async (authenticator) => {
        await _getRef(userId)
          .doc(authenticatorId)
          .update(authenticator, { lastUpdateTime: updateAt });
      },
    getAuthenticator: async (userId, authenticatorId) => {
      const ref = _getRef(userId).doc(authenticatorId);
      const snap = await ref.get();
      if (!snap.exists) {
        return O.none;
      }
      return pipe(
        snap.data(),
        AuthenticatorDocument.decode,
        O.fromEither,
        O.map(
          (data) =>
            [
              data,
              snap.updateTime ? snap.updateTime : new Timestamp(0, 0),
            ] as const
        )
      );
    },
    getAuthenticators: async (userId) => {
      const qs = await _getRef(userId).limit(7).get();
      return pipe(
        qs.docs,
        A.map(
          flow(
            (snap) => snap.data(),
            (a) => AuthenticatorDocument.decode(a),
            O.fromEither
          )
        ),
        A.compact
      );
    },
  };
};
