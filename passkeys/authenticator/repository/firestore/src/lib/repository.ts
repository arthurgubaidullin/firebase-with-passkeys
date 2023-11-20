import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { AuthenticatorRepository } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { Firestore, Timestamp, getFirestore } from 'firebase-admin/firestore';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { flow, pipe } from 'fp-ts/function';

const AUTHENTICATORS = 'authenticators' as const;

const getRef = (db: Firestore) => (userId: string) =>
  db.collection('users').doc(userId).collection(AUTHENTICATORS);

export const getAuthenticatorRepository = (): AuthenticatorRepository => {
  const db = getFirestore();
  const _getRef = getRef(db);
  return {
    createAuthenticator: async (userId, authenticatorId, authenticator) => {
      await _getRef(userId)
        .doc(authenticatorId)
        .create(AuthenticatorDocument.encode(authenticator));
    },
    updateAuthenticator:
      (userId, authenticatorId, updateAt) => async (authenticator) => {
        await _getRef(userId)
          .doc(authenticatorId)
          .update(authenticator, {
            lastUpdateTime: pipe(
              updateAt,
              O.fold(
                () => new Timestamp(0, 0),
                (updateAt) => Timestamp.fromMillis(updateAt)
              )
            ),
          });
      },
    getAuthenticator: (userId, authenticatorId) => async () => {
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
          (data) => [data, O.fromNullable(snap.updateTime?.toMillis())] as const
        )
      );
    },
    getAuthenticators: async (username) => {
      const q = db
        .collectionGroup(AUTHENTICATORS)
        .where('username', '==', username)
        .limit(7);
      const qs = await q.get();
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
