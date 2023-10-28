import { GetAuthenticators } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { setChallenge } from '@firebase-with-passkeys/passkeys-challenge-set-document';
import { PublicKeyCredentialRequestOptionsJSON } from '@firebase-with-passkeys/passkeys-types';
import { generateAuthenticationOptions as _generateAuthenticationOptions } from '@simplewebauthn/server';
import {
  PublicKeyCredentialDescriptorFuture,
  PublicKeyCredentialRequestOptionsJSON as _PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';
import * as E from 'fp-ts/Either';

export const UNAUTHENTICATED = 'unauthenticated';

export const generateAuthenticationOptions =
  (P: GetAuthenticators & SetChallenge) =>
  async (
    data?: Readonly<{ uid?: string }>
  ): Promise<
    E.Either<typeof UNAUTHENTICATED, _PublicKeyCredentialRequestOptionsJSON>
  > => {
    const userId = data?.uid;

    if (!userId) {
      return E.left(UNAUTHENTICATED);
    }

    const authenticators = await P.getAuthenticators(userId);

    const options = await _generateAuthenticationOptions({
      allowCredentials: authenticators.map(
        (authenticator): PublicKeyCredentialDescriptorFuture => ({
          id: authenticator.credentialID,
          type: 'public-key',
          transports: authenticator.transports,
        })
      ),
      userVerification: 'preferred',
    });

    await setChallenge(P)(userId, options);

    return E.right(PublicKeyCredentialRequestOptionsJSON.encode(options));
  };
