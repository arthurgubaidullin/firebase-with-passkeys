export interface GenerateAuthenticationOptions {
  readonly generateAuthenticationOptions: (data: {
    username: string;
  }) => Promise<{
    data?: unknown;
  }>;
}
