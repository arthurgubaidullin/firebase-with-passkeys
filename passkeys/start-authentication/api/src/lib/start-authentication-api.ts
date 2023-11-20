import * as Contract from '@firebase-with-passkeys/passkeys-generate-authentication-options-contract';
import { ResponseData } from '@firebase-with-passkeys/passkeys-verify-authentication-response-contract';
import { startAuthentication as _startAuthentication } from '@simplewebauthn/browser';
import {
  AuthenticationResponseJSON,
  PublicKeyCredentialRequestOptionsJSON as _PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';
import { failure } from 'io-ts/PathReporter';
import { GenerateAuthenticationOptions } from './generate-authentication-options-type';
import { VerifyAuthenticationResponse } from './verify-authentication-response-type';
import { SignInWithCustomToken } from './sign-in-with-custom-token';

export const startAuthenticationApi =
  (
    P: GenerateAuthenticationOptions &
      VerifyAuthenticationResponse &
      SignInWithCustomToken
  ) =>
  (username: string) =>
  async (): Promise<E.Either<Error, void>> => {
    if (!NonEmptyString.is(username)) {
      return E.left(new Error('Invalid username.'));
    }

    const resp = await TE.tryCatch(
      async () => await P.generateAuthenticationOptions({ username }),
      E.toError
    )();
    if (E.isLeft(resp)) {
      return resp;
    }

    const _data = pipe(
      resp.right.data,
      Contract.ResponseData.decode,
      E.mapLeft(failure),
      E.mapLeft((es) => new Error(es.toString()))
    );
    if (E.isLeft(_data)) {
      return _data;
    }
    const data: _PublicKeyCredentialRequestOptionsJSON = _data.right;

    let asseResp: AuthenticationResponseJSON;
    try {
      asseResp = await _startAuthentication(data);
    } catch (error) {
      return E.left(E.toError(error));
    }

    const _rawVerificationResponseData = await TE.tryCatch(
      async () =>
        P.verifyAuthenticationResponse({
          response: asseResp,
          username,
        }),
      E.toError
    )();
    if (E.isLeft(_rawVerificationResponseData)) {
      return _rawVerificationResponseData;
    }
    const rawVerificationResponseData = _rawVerificationResponseData.right;

    const verificationResponseData = pipe(
      rawVerificationResponseData.data,
      ResponseData.decode,
      E.mapLeft(failure),
      E.mapLeft((es) => new Error(es.toString()))
    );
    if (E.isLeft(verificationResponseData)) {
      return verificationResponseData;
    }
    const verificationJSON = verificationResponseData.right;

    if (verificationJSON.verified) {
      return P.signInWithCustomToken(verificationJSON.token)();
    } else {
      return E.left(
        new Error(
          `Oh no, something went wrong! Response:\n ${JSON.stringify(
            verificationJSON
          )}`
        )
      );
    }
  };
