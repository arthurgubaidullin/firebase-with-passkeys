import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { GetAuthenticators } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { LogError } from '@firebase-with-passkeys/passkeys-challenge-get-document';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import { flow, pipe } from 'fp-ts/function';

export const getAuthenticatorDocuments =
  (P: GetAuthenticators & LogError) =>
  async (userId: string): Promise<readonly AuthenticatorDocument[]> => {
    return pipe(
      TE.tryCatch(async () => P.getAuthenticators(userId), E.toError),
      TE.chainW(
        TE.traverseArray(flow(AuthenticatorDocument.decode, TE.fromEither))
      ),
      TE.orElseFirstIOK((e) => () => {
        if (e instanceof Error) {
          P.error(e.message, e);
        }
        if (Array.isArray(e)) {
          P.error('Some of the authenticator document schema is invalid.', {
            errors: e,
          });
        }
      }),
      TE.fold(() => T.of([]), T.of),
      (t) => t()
    );
  };