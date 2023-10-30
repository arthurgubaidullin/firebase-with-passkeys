export class UserHasNoEmail {
  public _tag = 'UserHasNoEmail' as const;
  public message = 'The user does not have email.' as const;
  constructor(public readonly data: Readonly<{ userId: string }>) {}
}
