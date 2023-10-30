export class UserNotFound {
  public readonly _tag = 'UserNotFound' as const;
  public readonly message = 'User is not found.' as const;
}
