import { GetUserByEmail } from './get-user-by-email';
import { GetUser } from './get-user-type';

export type AuthRepository = GetUser & GetUserByEmail;
