import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DB_URI,
  ssl: { rejectUnauthorized: false },
});

export async function connectDb() {
  for (let i = 0; i < 3; i++) {
    try {
      await pool.connect();
      console.log('postgres connected');
      return;
    } catch (err: any) {
      console.error(`db connection attempt ${i + 1} failed:`, err.message);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  console.error('db connection failed after retries');
}

export async function setupUsers() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;
  try {
    await pool.query(query);
    console.log('users table done');
  } catch (err: any) {
    console.error('table setup failed:', err.message);
  }
}

export default pool;