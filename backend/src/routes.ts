import { Router } from 'express';
import { register, login, getCalories, authMiddleware } from './ctrl.js';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/get-calories', authMiddleware, getCalories);

export default router;