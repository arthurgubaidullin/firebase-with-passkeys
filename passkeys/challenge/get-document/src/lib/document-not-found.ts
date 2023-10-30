export class ChallengeNotFound {
  public readonly _tag = 'ChallengeNotFound' as const;
  public readonly message = 'Challenge document not found.' as const;
  public readonly context: Readonly<{ userId: string }>;

  constructor(data: Readonly<{ userId: string }>) {
    this.context = data;
  }
}
