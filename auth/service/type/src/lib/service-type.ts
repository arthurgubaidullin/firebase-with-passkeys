import { GetUserByEmail } from './get-user-by-email-type';
import { GetUser } from './get-user-type';

export type AuthService = GetUser & GetUserByEmail;
