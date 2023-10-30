import { LogError } from '@firebase-with-passkeys/logger-type-server';
import { AuthenticatorDocument } from '@firebase-with-passkeys/passkeys-authenticator-document';
import { GetAuthenticator } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import * as E from 'fp-ts/Either';
import * as RT from 'fp-ts/ReadonlyTuple';
import * as TE from 'fp-ts/TaskEither';
import { flow, pipe } from 'fp-ts/function';
import { AuthenticatorNotFound } from './document-not-found';
import { InvalidAuthenticator } from './invalid-document';
import { validateDocumentData } from './validate-document-data';

export const getAuthenticatorDocument =
  (P: GetAuthenticator & LogError) =>
  (
    userId: string,
    authenticatorId: string
  ): TE.TaskEither<
    AuthenticatorNotFound | InvalidAuthenticator | Error,
    readonly [AuthenticatorDocument, number]
  > =>
    pipe(
      TE.tryCatch(
        async () => P.getAuthenticator(userId, authenticatorId),
        E.toError
      ),
      TE.chainW(
        TE.fromOption(
          () =>
            new AuthenticatorNotFound({
              userId,
              authenticatorId,
            })
        )
      ),
      TE.chainEitherKW(
        flow(
          RT.mapFst(validateDocumentData({ userId, authenticatorId })),
          RT.sequence(E.Applicative)
        )
      )
    );
