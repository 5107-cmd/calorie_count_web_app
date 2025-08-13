import { Pool } from 'pg';
import { User } from '../interfaces/user.js';

export class UserModel {
  #pool: Pool;

  constructor(pool: Pool) {
    this.#pool = pool;
  }

  async addUser(firstName: string, lastName: string, email: string, password: string): Promise<User> {
    const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
    try {
      const res = await this.#pool.query(query, [firstName, lastName, email, password]);
      return res.rows[0];
    } catch (err) {
      throw new Error('failed to add user');
    }
  }

  async getUser(email: string): Promise<User | undefined> {
    const query = 'SELECT * FROM users WHERE email = $1';
    try {
      const res = await this.#pool.query(query, [email]);
      return res.rows[0];
    } catch (err) {
      throw new Error('failed to get user');
    }
  }
}