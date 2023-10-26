import { HttpsCallable } from 'firebase/functions';
import * as E from 'fp-ts/Either';
import * as t from 'io-ts';
import { failure } from 'io-ts/PathReporter';
import { DataTransferContract } from './data-transfer-contract';
import { SchemaTypeError } from './schema-type-error';

export const enforceCaller =
  <Contract extends DataTransferContract<t.Mixed, t.Mixed>>(
    contract: Contract
  ) =>
  (callable: HttpsCallable<unknown, unknown>) =>
  async (
    data: t.TypeOf<Contract['request']>
  ): Promise<t.TypeOf<Contract['response']>> => {
    const result = await callable(contract.request.encode(data));

    const eitherResult: t.TypeOf<Contract['response']> =
      contract.response.decode(result.data);
    if (E.isLeft(eitherResult)) {
      const errors: string[] = failure(eitherResult.left);
      throw new SchemaTypeError(errors);
    }

    return eitherResult.right;
  };
