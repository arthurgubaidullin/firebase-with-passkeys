import { ChallengeDocument } from '@firebase-with-passkeys/passkeys-challenge-document';
import { SetChallenge } from './set-challenge-type';

export const setChallenge =
  (P: SetChallenge) =>
  async (userId: string, challenge: ChallengeDocument): Promise<void> => {
    const data = ChallengeDocument.encode(challenge);
    await P.setChallenge(userId, data);
  };
