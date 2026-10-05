import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.get('/profile', requireAuth, rateLimiter('api.get'), UserController.getProfile);

export default router;
