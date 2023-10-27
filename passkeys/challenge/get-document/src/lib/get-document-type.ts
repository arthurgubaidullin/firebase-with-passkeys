import { ChallengeDocument } from '@firebase-with-passkeys/passkeys-challenge-document';
import * as O from 'fp-ts/Option';

export interface GetChallenge {
  readonly getChallenge: (
    userId: string
  ) => Promise<O.Option<ChallengeDocument>>;
}
