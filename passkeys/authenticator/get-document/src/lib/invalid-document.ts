export class InvalidAuthenticator {
  public readonly _tag = 'InvalidAuthenticator' as const;
  public readonly message = 'Invalid challenge document.' as const;
  public readonly context: Readonly<{
    userId: string;
    authenticatorId: string;
    errors: readonly string[];
  }>;

  constructor(
    data: Readonly<{
      userId: string;
      authenticatorId: string;
      errors: readonly string[];
    }>
  ) {
    this.context = data;
  }

  static create(
    data: Readonly<{
      userId: string;
      authenticatorId: string;
    }>
  ) {
    return (errors: readonly string[]) =>
      new InvalidAuthenticator({ ...data, errors });
  }
}
