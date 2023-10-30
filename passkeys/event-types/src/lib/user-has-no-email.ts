export class UserHasNoEmail {
  public readonly _tag = 'UserHasNoEmail' as const;
  public readonly message = 'The user does not have email.' as const;
  constructor(public readonly data: Readonly<{ userId: string }>) {}
}
