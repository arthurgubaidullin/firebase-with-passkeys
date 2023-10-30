import * as t from 'io-ts';

export type ResponseData = t.OutputOf<typeof ResponseData>;

export const ResponseData = t.readonly(
  t.strict({
    verified: t.boolean,
  })
);
