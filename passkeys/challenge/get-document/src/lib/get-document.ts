import { LogError } from '@firebase-with-passkeys/logger-type-server';
import { ChallengeDocument } from '@firebase-with-passkeys/passkeys-challenge-document';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { identity, pipe } from 'fp-ts/function';
import { ChallengeNotFound } from './document-not-found';
import { GetChallenge } from './get-document-type';
import { InvalidChallenge } from './invalid-document';
import { validateDocumentData } from './validate-document-data';

export const getChallenge =
  (P: GetChallenge & LogError) =>
  (
    userId: string
  ): TE.TaskEither<
    InvalidChallenge | ChallengeNotFound | Error,
    ChallengeDocument
  > =>
    pipe(
      TE.tryCatch(async () => P.getChallenge(userId), E.toError),
      TE.chainOptionKW(() => new ChallengeNotFound({ userId }))(identity),
      TE.chainEitherKW(validateDocumentData)
    );
