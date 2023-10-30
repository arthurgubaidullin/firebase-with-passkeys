import { generateAuthenticationOptionsHandler } from '@firebase-with-passkeys/passkeys-generate-authentication-options-api';
import { generateRegistrationOptionsHandler } from '@firebase-with-passkeys/passkeys-generate-registration-options-api';
import { verifyAuthenticationResponseHandler } from '@firebase-with-passkeys/passkeys-verify-authentication-response-api';
import { verifyRegistrationResponseHandler } from '@firebase-with-passkeys/passkeys-verify-registration-response-api';
import { initializeApp } from 'firebase-admin/app';
import { onCall } from 'firebase-functions/v1/https';
import { pipe } from 'fp-ts/function';
import { getProgram } from '@firebase-with-passkeys/passkeys-program-firebase-functions-v1';

initializeApp();

export const generateRegistrationOptions = pipe(
  getProgram(),
  generateRegistrationOptionsHandler,
  onCall
);

export const verifyRegistrationResponse = pipe(
  getProgram(),
  verifyRegistrationResponseHandler,
  onCall
);

export const generateAuthenticationOptions = pipe(
  getProgram(),
  generateAuthenticationOptionsHandler,
  onCall
);

export const verifyAuthenticationResponse = pipe(
  getProgram(),
  verifyAuthenticationResponseHandler,
  onCall
);
