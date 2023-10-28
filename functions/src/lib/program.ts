import { getUserApi } from '@firebase-with-passkeys/auth-get-user-api';
import { AuthService } from '@firebase-with-passkeys/auth-service-type';
import { getAuthenticatorRepository } from '@firebase-with-passkeys/passkeys-authenticator-repository-firestore';
import { AuthenticatorRepository } from '@firebase-with-passkeys/passkeys-authenticator-repository-type';
import { LogError } from '@firebase-with-passkeys/passkeys-challenge-get-document';
import { getChallengeRepository } from '@firebase-with-passkeys/passkeys-challenge-repository-firestore';
import { ChallengeRepository } from '@firebase-with-passkeys/passkeys-challenge-repository-type';
import { getConfigReader } from '@firebase-with-passkeys/passkeys-config-reader-env';
import { ConfigReader } from '@firebase-with-passkeys/passkeys-config-reader-type';
import { logger } from 'firebase-functions/v1';

type Program = LogError &
  AuthService &
  ChallengeRepository &
  AuthenticatorRepository &
  ConfigReader;

export const getProgram = (): Program => ({
  ...logger,
  ...getChallengeRepository(),
  ...getAuthenticatorRepository(),
  ...getUserApi(),
  ...getConfigReader(),
});
