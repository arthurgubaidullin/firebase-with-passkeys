import * as t from 'io-ts';

export type ChallengeDocument = t.TypeOf<typeof ChallengeDocument>;

export const ChallengeDocument = t.readonly(
  t.strict({
    challenge: t.string,
  })
);
