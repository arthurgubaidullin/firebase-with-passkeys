import * as t from 'io-ts';

export type ResponseData = t.OutputOf<typeof ResponseData>;

export const ResponseData = t.readonly(
  t.union([
    t.strict({
      verified: t.literal(true),
      token: t.string,
    }),
    t.strict({
      verified: t.literal(false),
    }),
  ])
);
