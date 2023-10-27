import { ChallengeDocument } from '@firebase-with-passkeys/passkeys-challenge-document';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { flow, identity, pipe } from 'fp-ts/function';
import { failure } from 'io-ts/PathReporter';
import { GetChallenge } from './get-document-type';
import { LogError } from './log-error-type';

const NOT_FOUND = 'Not found.' as const;

const validateDocumentData = flow(ChallengeDocument.decode, E.mapLeft(failure));

export const getChallenge =
  (P: GetChallenge & LogError) =>
  async (userId: string): Promise<O.Option<ChallengeDocument>> => {
    return pipe(
      TE.tryCatch(async () => P.getChallenge(userId), E.toError),
      TE.chainOptionKW(() => NOT_FOUND)(identity),
      TE.chainEitherKW(validateDocumentData),
      TE.orElseFirstIOK((error) => () => {
        if (error instanceof Error) {
          P.error('Failed to fetch the challenge document.', {
            userId,
            errors: [error],
          });
        }
        if (Array.isArray(error)) {
          P.error('Challenge document schema invalid.', { errors: error });
        }
      }),
      TO.fromTaskEither,
      (t) => t()
    );
  };
