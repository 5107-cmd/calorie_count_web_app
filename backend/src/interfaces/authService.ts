import { User } from './user.js';

export interface AuthService {
  register(firstName: string, lastName: string, email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<{ token: string; user: User }>;
}