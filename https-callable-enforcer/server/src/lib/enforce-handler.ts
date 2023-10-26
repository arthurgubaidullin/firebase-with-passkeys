import { HttpsError } from 'firebase-functions/v1/https';
import * as E from 'fp-ts/Either';
import * as t from 'io-ts';
import { failure } from 'io-ts/PathReporter';
import { DataTransferContract } from './data-transfer-contract';

export const enforceHandler =
  <Contract extends DataTransferContract<t.Mixed, t.Mixed>>(
    contract: Contract
  ) =>
  <Context>(
    f: (
      data: t.TypeOf<Contract['request']>,
      context?: Context
    ) => Promise<t.TypeOf<Contract['response']>>
  ) =>
  async (
    data: unknown,
    context?: Context
  ): Promise<t.OutputOf<Contract['response']>> => {
    const reqCodec = contract.request;
    const resCodec = contract.response;
    const eitherData: t.Validation<t.TypeOf<Contract['request']>> =
      reqCodec.decode(data);
    if (E.isLeft(eitherData)) {
      const details: Readonly<{ errors: string[] }> = {
        errors: failure(eitherData.left),
      };
      throw new HttpsError(
        'invalid-argument',
        'Invalid request schema.',
        details
      );
    }
    const result = await f(eitherData.right, context);
    return resCodec.encode(result);
  };
