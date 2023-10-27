import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { GetAuthenticator } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { LogError } from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { Timestamp } from 'firebase-admin/firestore';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as RT from 'fp-ts/ReadonlyTuple';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { flow, pipe } from 'fp-ts/function';

const NOT_FOUND = 'Not found.' as const;

export const getAuthenticatorDocument =
  (P: GetAuthenticator & LogError) =>
  async (
    userId: string,
    authenticatorId: string
  ): Promise<O.Option<readonly [AuthenticatorDocument, Timestamp]>> => {
    const r = pipe(
      TE.tryCatch(
        async () => P.getAuthenticator(userId, authenticatorId),
        E.toError
      ),
      TE.chainW(TE.fromOption(() => NOT_FOUND)),
      TE.chainEitherKW(
        flow(
          RT.mapFst(AuthenticatorDocument.decode),
          RT.sequence(E.Applicative)
        )
      ),
      TE.orElseFirstIOK((e) => () => {
        if (e instanceof Error) {
          P.error(e.message, e);
        }
        if (Array.isArray(e)) {
          P.error('Authenticator document schema invalid.', { errors: e });
        }
      }),
      TO.fromTaskEither,
      (t) => t()
    );

    return r;
  };
