export interface GenerateAuthenticationOptions {
  readonly generateAuthenticationOptions: (data?: unknown) => Promise<{
    data?: unknown;
  }>;
}
