import { ChallengeDocument } from '@firebase-with-passkeys/passkeys-challenge-document';
import * as O from 'fp-ts/Option';
import * as t from 'io-ts';

export interface GetChallenge {
  readonly getChallenge: (
    userId: string
  ) => Promise<O.Option<t.OutputOf<typeof ChallengeDocument>>>;
}
