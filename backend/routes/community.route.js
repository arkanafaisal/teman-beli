import { Router } from 'express';
import { createCommunity } from '../controllers/community.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/', requireAuth, rateLimiter('community.create'), createCommunity);

export default router;
