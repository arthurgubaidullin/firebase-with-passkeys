import * as TE from 'fp-ts/TaskEither';

export interface SignInWithCustomToken {
  readonly signInWithCustomToken: (token: string) => TE.TaskEither<Error, void>;
}
