export class UserUnauthenticated {
  public readonly _tag = 'UserUnauthenticated' as const;
  public readonly message = 'The user is not authenticated.' as const;
}
