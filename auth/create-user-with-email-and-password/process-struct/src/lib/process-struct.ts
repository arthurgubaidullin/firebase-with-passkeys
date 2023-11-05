interface Initial {
  readonly _tag: 'initial';
}

interface Fetching {
  readonly _tag: 'fetching';
  readonly email: string;
  readonly password: string;
}

interface Success {
  readonly _tag: 'success';
  readonly email: string;
}

interface Failure {
  readonly _tag: 'failure';
  readonly error: Error;
}

export type Process = Initial | Fetching | Success | Failure;

export const isInitial = (process: Process): process is Initial =>
  process._tag === 'initial';

export const isFetching = (process: Process): process is Fetching =>
  process._tag === 'fetching';

export const isSuccess = (process: Process): process is Success =>
  process._tag === 'success';

export const isFailure = (process: Process): process is Failure =>
  process._tag === 'failure';

export const initial: Initial = Object.freeze({
  _tag: 'initial',
});

const fetching = (email: string, password: string): Fetching => ({
  _tag: 'fetching',
  email,
  password,
});

const success = (email: string): Success => ({
  _tag: 'success',
  email: email,
});

const failure = (error: Error): Failure => ({
  _tag: 'failure',
  error,
});

export const createUser =
  (email: string, password: string) =>
  (process: Process): Process => {
    if (isInitial(process)) {
      return fetching(email, password);
    }
    return process;
  };

export const userCreated = (process: Process): Process => {
  if (isFetching(process)) {
    return success(process.email);
  }
  return process;
};

export const userNotCreated =
  (error: Error) =>
  (process: Process): Process => {
    if (isFetching(process)) {
      return failure(error);
    }
    return process;
  };
