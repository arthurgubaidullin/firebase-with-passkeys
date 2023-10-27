import { ChallengeDocument } from '@firebase-with-passkeys/passkeys-challenge-document';

export interface SetChallenge {
  readonly setChallenge: (
    userId: string,
    challenge: ChallengeDocument
  ) => Promise<void>;
}
