import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { validate } from '../middlewares/validation.middleware.js';
import { setPasswordSchema } from '../schemas/auth.schema.js';

const router = express.Router();

router.get('/profile', requireAuth, rateLimiter('api.get'), UserController.getProfile);
router.put('/password', requireAuth, rateLimiter('user.update'), validate({ body: setPasswordSchema }), UserController.setPassword);
router.get('/reviews', requireAuth, rateLimiter('api.get'), UserController.getReviews);

export default router;
