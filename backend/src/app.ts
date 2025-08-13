import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import routes from './routes.js';
import { connectDb, setupUsers } from './db.js';
import { config } from './config/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://caloriecountwebapp.netlify.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

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
