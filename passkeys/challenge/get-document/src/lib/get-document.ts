import { ChallengeDocument } from '@firebase-with-passkeys/passkeys-challenge-document';
import * as O from 'fp-ts/Option';
import { GetChallenge } from './get-document-type';

export const getChallenge =
  (P: GetChallenge) =>
  async (userId: string): Promise<O.Option<ChallengeDocument>> => {
    const raw = await P.getChallenge(userId);
    if (O.isNone(raw)) {
      return O.none;
    }
    const data = ChallengeDocument.decode(raw);
    return O.fromEither(data);
  };
