import { GetUserByEmail } from '@firebase-with-passkeys/auth-service-type';
import { LogError } from '@firebase-with-passkeys/logger-type-server';
import { GetAuthenticators } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { setChallenge } from '@firebase-with-passkeys/passkeys-challenge-set-document';
import {
  InvalidInput,
  UserNotFound,
} from '@firebase-with-passkeys/passkeys-event-types';
import { getAuthenticatorDocuments } from '@firebase-with-passkeys/passkeys-get-authenticator-documents';
import { PublicKeyCredentialRequestOptionsJSON } from '@firebase-with-passkeys/passkeys-types';
import { generateAuthenticationOptions as _generateAuthenticationOptions } from '@simplewebauthn/server';
import {
  PublicKeyCredentialDescriptorFuture,
  PublicKeyCredentialRequestOptionsJSON as _PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { TaskEither } from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { RequestData } from './request-data';

export const generateAuthenticationOptions =
  (P: LogError & GetAuthenticators & SetChallenge & GetUserByEmail) =>
  (
    rawData: unknown
  ): TaskEither<
    UserNotFound | InvalidInput,
    _PublicKeyCredentialRequestOptionsJSON
  > =>
  async () => {
    const _data = pipe(
      rawData,
      RequestData.decode,
      E.mapLeft(InvalidInput.create)
    );
    if (E.isLeft(_data)) {
      return _data;
    }
    const data = _data.right;

    const u = await P.getUserByEmail(data.username);

    if (O.isNone(u)) {
      return E.left(new UserNotFound());
    }

    const authenticators = await getAuthenticatorDocuments(P)(data.username);

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

    await setChallenge(P)(u.value.uid, options);

    return E.right(PublicKeyCredentialRequestOptionsJSON.encode(options));
  };
