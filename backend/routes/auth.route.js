import express from 'express';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', rateLimiter('auth.login'), AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.refresh);

export default router;
