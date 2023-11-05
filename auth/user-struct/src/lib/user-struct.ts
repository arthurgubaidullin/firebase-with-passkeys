import * as O from 'fp-ts/Option';

export interface UserStruct {
  readonly uid: string;
  readonly email: O.Option<string>;
}

export const fromUserRecord = (a: {
  uid: string;
  email?: string;
}): UserStruct => ({
  uid: a.uid,
  email: O.fromNullable(a.email),
});
