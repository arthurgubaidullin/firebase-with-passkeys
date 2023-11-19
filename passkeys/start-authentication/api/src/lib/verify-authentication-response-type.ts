import { RequestData } from '@firebase-with-passkeys/passkeys-verify-authentication-response-contract';

export interface VerifyAuthenticationResponse {
  readonly verifyAuthenticationResponse: (data: RequestData) => Promise<{
    data?: unknown;
  }>;
}
