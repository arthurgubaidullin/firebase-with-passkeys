import { SetChallenge } from './set-challenge-type';
import { GetChallenge } from './get-challenge-type';

export type ChallengeRepository = SetChallenge & GetChallenge;
