import { Route, end, lit, parse, zero } from 'fp-ts-routing';

interface Home {
  readonly _tag: 'Home';
}

interface SignIn {
  readonly _tag: 'SignIn';
}

interface CompleteSignIn {
  readonly _tag: 'CompleteSignIn';
}

interface NotFound {
  readonly _tag: 'NotFound';
}

export type _Location = Home | SignIn | CompleteSignIn | NotFound;

const home: _Location = { _tag: 'Home' };

export const signIn: _Location = { _tag: 'SignIn' };

export const completeSignIn: _Location = { _tag: 'CompleteSignIn' };

const notFound: _Location = { _tag: 'NotFound' };

const defaults = end;

const homeMatch = lit('home').then(end);

const signInMatch = lit('sign-in');

const signInMatchEnd = signInMatch.then(end);

const completeSignInMatch = signInMatch.then(lit('complete'));

const router = zero<_Location>()
  .alt(defaults.parser.map(() => home))
  .alt(homeMatch.parser.map(() => home))
  .alt(signInMatchEnd.parser.map(() => signIn))
  .alt(completeSignInMatch.parser.map(() => completeSignIn));

export const parseLocation = (s: string): _Location =>
  parse(router, Route.parse(s), notFound);
