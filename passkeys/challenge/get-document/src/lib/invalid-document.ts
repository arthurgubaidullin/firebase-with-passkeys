export class InvalidChallenge {
  public readonly _tag = 'InvalidChallenge' as const;
  public readonly message = 'Invalid challenge document.' as const;
  public readonly context: Readonly<{ errors: readonly string[] }>;

  constructor(data: Readonly<{ errors: readonly string[] }>) {
    this.context = data;
  }

  static create(errors: readonly string[]) {
    return new InvalidChallenge({ errors });
  }
}
