export class AuthenticatorNotFound {
  public readonly _tag = 'AuthenticatorNotFound' as const;
  public readonly message = 'Authenticator document not found.' as const;
  public readonly context: Readonly<{
    userId: string;
    authenticatorId: string;
  }>;

  constructor(data: Readonly<{ userId: string; authenticatorId: string }>) {
    this.context = data;
  }
}
