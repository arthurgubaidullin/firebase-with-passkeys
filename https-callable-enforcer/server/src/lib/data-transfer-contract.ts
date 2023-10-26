import * as t from 'io-ts';

export interface DataTransferContract<T1 extends t.Mixed, T2 extends t.Mixed> {
  request: T1;
  response: T2;
}
