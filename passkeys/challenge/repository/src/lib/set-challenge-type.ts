import { ChallengeDocument } from '@firebase-with-passkeys/passkeys-challenge-document';
import { OutputOf } from 'io-ts';

export interface SetChallenge {
  readonly setChallenge: (
    userId: string,
    challenge: OutputOf<typeof ChallengeDocument>
  ) => Promise<void>;
}
