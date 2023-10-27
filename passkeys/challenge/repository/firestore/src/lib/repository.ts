import { ChallengeDocument } from '@firebase-with-passkeys/passkeys-challenge-document';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import * as O from 'fp-ts/Option';
import { OutputOf } from 'io-ts';
import { ChallengeRepository } from '@firebase-with-passkeys/passkeys-challenge-repository-type';

const getRef = (db: Firestore) => (userId: string) =>
  db.collection('users').doc(userId).collection('challenges').doc(userId);

export const getChallengeRepository = (): ChallengeRepository => {
  const db = getFirestore();
  const _getRef = getRef(db);
  return {
    getChallenge: async (userId) => {
      const ref = _getRef(userId);
      const snap = await ref.get();
      if (!snap.exists) {
        return O.none;
      }
      return O.some(snap.data() as OutputOf<typeof ChallengeDocument>);
    },
    setChallenge: async (userId, challenge) => {
      const ref = _getRef(userId);
      await ref.set(challenge);
    },
  };
};
