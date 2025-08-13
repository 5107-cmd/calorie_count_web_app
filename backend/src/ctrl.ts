import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { AuthServiceImpl } from './services/authService.js';
import { UserModel } from './models/user.js';
import { fuzzyMatch } from './utils/fuzzy.js';
import { config } from './config/index.js';
import pool from './db.js';

const userModel = new UserModel(pool);
const authService = new AuthServiceImpl(userModel);

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'no token' });
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'bad token' });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'fill all fields' });
    }
    const user = await authService.register(first_name, last_name, email, password);
    res.status(201).json({ message: 'user added', user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'need email and password' });
    }
    const { token, user } = await authService.login(email, password);
    res.json({ message: 'logged in', token, user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}

export async function getCalories(req: Request, res: Response) {
  try {
    const { dish_name, servings } = req.body;
    if (!dish_name || !servings || servings <= 0) {
      return res.status(400).json({ error: 'bad dish or servings' });
    }
    const resData = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      params: { query: dish_name, api_key: config.usdaApiKey, pageSize: 10 },
    });
    const foods = resData.data.foods;
    if (!foods || foods.length === 0) return res.status(404).json({ error: 'dish not found' });
    const best = fuzzyMatch(dish_name, foods.map((f: any) => f.description));
    const food = foods.find((f: any) => f.description === best);
    if (!food) return res.status(404).json({ error: 'no match' });
    const calPer100g = food.foodNutrients.find((n: any) => n.nutrientName === 'Energy')?.value || 0;
    const calPerServing = calPer100g;
    const totalCal = calPerServing * servings;
    res.json({
      dish_name,
      servings,
      calories_per_serving: calPerServing,
      total_calories: totalCal,
      source: 'USDA FoodData Central',
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}