export class SchemaTypeError extends TypeError {
  constructor(public readonly errors: string[]) {
    super('Invalid schema.');
  }
}
