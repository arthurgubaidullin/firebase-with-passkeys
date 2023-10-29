import { GetUserByEmail } from '@firebase-with-passkeys/auth-service-type';
import { GetAuthenticators } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { LogError } from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { SetChallenge } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { setChallenge } from '@firebase-with-passkeys/passkeys-challenge-set-document';
import { getAuthenticatorDocuments } from '@firebase-with-passkeys/passkeys-get-authenticator-documents';
import { PublicKeyCredentialRequestOptionsJSON } from '@firebase-with-passkeys/passkeys-types';
import { generateAuthenticationOptions as _generateAuthenticationOptions } from '@simplewebauthn/server';
import {
  PublicKeyCredentialRequestOptionsJSON as _PublicKeyCredentialRequestOptionsJSON,
  PublicKeyCredentialDescriptorFuture,
} from '@simplewebauthn/typescript-types';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { failure } from 'io-ts/PathReporter';
import { RequestData } from './request-data';

export const FAILED_PRECONDITION = 'failed-precondition';

export const generateAuthenticationOptions =
  (P: LogError & GetAuthenticators & SetChallenge & GetUserByEmail) =>
  async (
    rawData: unknown
  ): Promise<
    E.Either<
      typeof FAILED_PRECONDITION | string[],
      _PublicKeyCredentialRequestOptionsJSON
    >
  > => {
    const _data = pipe(rawData, RequestData.decode, E.mapLeft(failure));
    if (E.isLeft(_data)) {
      return _data;
    }
    const data = _data.right;

    const u = await P.getUserByEmail(data.username);

    if (O.isNone(u)) {
      return E.left(FAILED_PRECONDITION);
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
