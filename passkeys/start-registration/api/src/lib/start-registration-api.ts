import { PublicKeyCredentialCreationOptionsJSON } from '@firebase-with-passkeys/passkeys-types';
import { startRegistration as _startRegistration } from '@simplewebauthn/browser';
import { RegistrationResponseJSON } from '@simplewebauthn/typescript-types';
import * as E from 'fp-ts/Either';
import { constVoid, pipe } from 'fp-ts/function';
import * as t from 'io-ts';
import { failure } from 'io-ts/PathReporter';

const VerifyRegistrationResponseData = t.readonly(
  t.strict({
    verified: t.boolean,
  })
);

export const startRegistrationApi =
  (
    P: Readonly<{
      generateRegistrationOptions: (
        data?: unknown
      ) => Promise<Readonly<{ data: unknown }>>;
      verifyRegistrationResponse: (
        data?: unknown
      ) => Promise<Readonly<{ data: unknown }>>;
    }>
  ) =>
  async (): Promise<E.Either<Error, void>> => {
    const resp = await P.generateRegistrationOptions();

    const _data = pipe(
      resp.data,
      PublicKeyCredentialCreationOptionsJSON.decode,
      E.mapLeft(failure),
      E.mapLeft((es) => new Error(es.toString()))
    );
    if (E.isLeft(_data)) {
      return _data;
    }
    const data = _data.right;

    let registrationResponseData: RegistrationResponseJSON;
    try {
      registrationResponseData = await _startRegistration(data);
    } catch (error) {
      return E.left(E.toError(error));
    }

    const rawVerificationResponseData = await P.verifyRegistrationResponse(
      registrationResponseData
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
