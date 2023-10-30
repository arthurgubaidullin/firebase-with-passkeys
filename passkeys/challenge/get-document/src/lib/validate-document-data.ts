import { ChallengeDocument } from '@firebase-with-passkeys/passkeys-challenge-document';
import * as E from 'fp-ts/Either';
import { flow } from 'fp-ts/function';
import { failure } from 'io-ts/PathReporter';
import { InvalidChallenge } from './invalid-document';

export const validateDocumentData = flow(
  ChallengeDocument.decode,
  E.mapLeft(failure),
  E.mapLeft(InvalidChallenge.create)
);
