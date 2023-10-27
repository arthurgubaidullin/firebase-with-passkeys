import { CreateAuthenticator } from './create-authenticator-type';
import { UpdateAuthenticator } from './update-authenticator-type';
import { GetAuthenticators } from './get-authenticators-type';
import { GetAuthenticator } from './get-authenticator-type';

export type AuthenticatorRepository = CreateAuthenticator &
  GetAuthenticators &
  GetAuthenticator &
  UpdateAuthenticator;
