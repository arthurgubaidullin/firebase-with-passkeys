import { GetUser } from '@firebase-with-passkeys/auth-service-type';
import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { GetAuthenticators } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { setChallenge } from '@firebase-with-passkeys/passkeys-challenge-set-document';
import { GetConfig } from '@firebase-with-passkeys/passkeys-config-reader-type';
import {
  UserHasNoEmail,
  UserUnauthenticated,
} from '@firebase-with-passkeys/passkeys-event-types';
import { getAuthenticatorDocuments } from '@firebase-with-passkeys/passkeys-get-authenticator-documents';
import { getConfig } from '@firebase-with-passkeys/passkeys-get-config';
import { generateRegistrationOptions as _generateRegistrationOptions } from '@simplewebauthn/server';
import { PublicKeyCredentialCreationOptionsJSON as _PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { TaskEither } from 'fp-ts/TaskEither';
import { LogError } from '@firebase-with-passkeys/logger-type-server';
import { ResponseData } from '@firebase-with-passkeys/passkeys-generate-registration-options-contract';
import { createChallengeDocument } from '@firebase-with-passkeys/passkeys-challenge-document';

export const generateRegistrationOptions =
  (P: GetConfig & GetUser & SetChallenge & GetAuthenticators & LogError) =>
  (
    data?: Readonly<{ uid?: string }>
  ): TaskEither<
    Error | UserUnauthenticated | UserHasNoEmail,
    _PublicKeyCredentialCreationOptionsJSON
  > =>
  async () => {
    const userId = data?.uid;

    const _config = pipe(getConfig(P), (a) => a());

    if (E.isLeft(_config)) {
      return _config;
    }

    const config = _config.right;

    if (!userId) {
      return E.left(new UserUnauthenticated());
    }

    const _user = P.getUser(userId)();

    const user = await _user;

    if (O.isNone(user)) {
      return E.left(new UserUnauthenticated());
    }
    if (O.isNone(user.value.email)) {
      return E.left(new UserHasNoEmail({ userId: user.value.uid }));
    }

    const authenticators: readonly AuthenticatorDocument[] =
      await getAuthenticatorDocuments(P)(user.value.email.value);

    const options = await _generateRegistrationOptions({
      rpName: config.NX_RP_NAME,
      rpID: config.NX_RP_ID,
      userID: user.value.uid,
      userName: user.value.email.value,
      attestationType: 'none',
      excludeCredentials: authenticators.map((authenticator) => ({
        id: authenticator.credentialID,
        type: 'public-key',
        transports: authenticator.transports,
      })),
    });

    const challengeDocument = createChallengeDocument({
      ...options,
      username: user.value.email.value,
    });

    await setChallenge(P)(user.value.uid, challengeDocument);

    return E.right(ResponseData.encode(options));
  };
