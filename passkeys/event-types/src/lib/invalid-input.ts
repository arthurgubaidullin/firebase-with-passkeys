import { pipe } from 'fp-ts/function';
import { ValidationError } from 'io-ts';
import { failure } from 'io-ts/PathReporter';

export class InvalidInput {
  public readonly _tag = 'InvalidInput' as const;
  public readonly message = 'Invalid input data.' as const;
  public readonly data: Readonly<{ errors: readonly string[] }>;

  static create(errors: ValidationError[]) {
    return new InvalidInput({ errors });
  }

  constructor(_data: Readonly<{ errors: ValidationError[] }>) {
    this.data = { errors: pipe(_data.errors, failure) };
  }
}
