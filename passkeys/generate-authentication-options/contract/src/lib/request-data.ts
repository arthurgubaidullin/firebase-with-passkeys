import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export const RequestData = t.readonly(t.strict({ username: NonEmptyString }));
