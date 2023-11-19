import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export type ChallengeDocument = t.TypeOf<typeof ChallengeDocument>;

export const ChallengeDocument = t.readonly(
  t.strict({
    challenge: t.string,
    username: NonEmptyString,
  })
);

export const createChallengeDocument = (data: {
  challenge: string;
  username: NonEmptyString;
}): ChallengeDocument => ({
  challenge: data.challenge,
  username: data.username,
});
