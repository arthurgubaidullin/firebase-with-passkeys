import { generateAuthenticationOptionsHandler } from '@firebase-with-passkeys/passkeys-generate-authentication-options-firebase-function-server';
import { generateRegistrationOptionsHandler } from '@firebase-with-passkeys/passkeys-generate-registration-options-firebase-function-server';
import { verifyAuthenticationResponseHandler } from '@firebase-with-passkeys/passkeys-verify-authentication-response-firebase-function-server';
import { verifyRegistrationResponseHandler } from '@firebase-with-passkeys/passkeys-verify-registration-response-firebase-function-server';
import { initializeApp } from 'firebase-admin/app';
import { onCall } from 'firebase-functions/v1/https';
import { pipe } from 'fp-ts/function';
import { getProgram } from '@firebase-with-passkeys/passkeys-program-firebase-functions-server';

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
