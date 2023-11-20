import { TaskEither } from 'fp-ts/TaskEither';

export interface CreateCustomToken {
  readonly createCustomToken: (userId: string) => TaskEither<Error, string>;
}
