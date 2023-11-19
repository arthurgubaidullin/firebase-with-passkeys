import { PublicKeyCredentialRequestOptionsJSON } from '@firebase-with-passkeys/passkeys-types';
import { startAuthentication as _startAuthentication } from '@simplewebauthn/browser';
import { AuthenticationResponseJSON } from '@simplewebauthn/typescript-types';
import * as E from 'fp-ts/Either';
import { constVoid, pipe } from 'fp-ts/function';
import * as t from 'io-ts';
import { failure } from 'io-ts/PathReporter';
import { GenerateAuthenticationOptions } from './generate-authentication-options-type';
import { VerifyAuthenticationResponse } from './verify-authentication-response-type';
import * as TE from 'fp-ts/TaskEither';

const VerifyRegistrationResponseData = t.readonly(
  t.strict({
    verified: t.boolean,
  })
);

export const startAuthenticationApi =
  (P: GenerateAuthenticationOptions & VerifyAuthenticationResponse) =>
  (username: string) =>
  async (): Promise<E.Either<Error, void>> => {
    const resp = await TE.tryCatch(
      async () => await P.generateAuthenticationOptions({ username }),
      E.toError
    )();
    if (E.isLeft(resp)) {
      return resp;
    }

    const _data = pipe(
      resp.right.data,
      PublicKeyCredentialRequestOptionsJSON.decode,
      E.mapLeft(failure),
      E.mapLeft((es) => new Error(es.toString()))
    );
    if (E.isLeft(_data)) {
      return _data;
    }
    const data = _data.right;

    let asseResp: AuthenticationResponseJSON;
    try {
      asseResp = await _startAuthentication(data);
    } catch (error) {
      return E.left(E.toError(error));
    }

    const rawVerificationResponseData = await P.verifyAuthenticationResponse(
      asseResp
    );

    const verificationResponseData = pipe(
      rawVerificationResponseData.data,
      VerifyRegistrationResponseData.decode,
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
