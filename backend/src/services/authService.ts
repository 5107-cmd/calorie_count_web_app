import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.js';
import { AuthService } from '../interfaces/authService.js';
import { User } from '../interfaces/user.js';
import { config } from '../config/index.js';

export class AuthServiceImpl implements AuthService {
  #userModel: UserModel;

  constructor(userModel: UserModel) {
    this.#userModel = userModel;
  }

  async register(firstName: string, lastName: string, email: string, password: string): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);
    return this.#userModel.addUser(firstName, lastName, email, hashed);
  }

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const user = await this.#userModel.getUser(email);
    if (!user) throw new Error('user not found');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('wrong password');
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });
    return { token, user };
  }
}