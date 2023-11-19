import * as Contract from '@firebase-with-passkeys/passkeys-generate-authentication-options-contract';
import { ResponseData } from '@firebase-with-passkeys/passkeys-verify-authentication-response-contract';
import { startAuthentication as _startAuthentication } from '@simplewebauthn/browser';
import {
  AuthenticationResponseJSON,
  PublicKeyCredentialRequestOptionsJSON as _PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { constVoid, pipe } from 'fp-ts/function';
import { failure } from 'io-ts/PathReporter';
import { GenerateAuthenticationOptions } from './generate-authentication-options-type';
import { VerifyAuthenticationResponse } from './verify-authentication-response-type';
import { NonEmptyString } from 'io-ts-types';

export const startAuthenticationApi =
  (P: GenerateAuthenticationOptions & VerifyAuthenticationResponse) =>
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

    const rawVerificationResponseData = await P.verifyAuthenticationResponse({
      response: asseResp,
      username,
    });

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

    if (verificationJSON && verificationJSON.verified) {
      return E.right(constVoid());
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
