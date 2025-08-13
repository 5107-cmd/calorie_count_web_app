import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import routes from './routes.js';
import { connectDb, setupUsers } from './db.js';
import { config } from './config/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  message: { error: 'Too many requests, please try again later.' },
}));

app.get('/', (req, res) => {
res.send('Server is up!');
});

connectDb().then(() => setupUsers());

app.use('/', routes);

export default app;