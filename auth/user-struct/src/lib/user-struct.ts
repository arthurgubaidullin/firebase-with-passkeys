import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';

export interface UserStruct {
  readonly uid: string;
  readonly email: O.Option<NonEmptyString>;
}

export const fromUserRecord = (a: {
  uid: string;
  email?: string | null;
}): UserStruct => ({
  uid: a.uid,
  email: pipe(
    O.fromNullable(a.email),
    O.chain(O.fromPredicate(NonEmptyString.is))
  ),
});
