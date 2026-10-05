import { Router } from 'express';
import { createCommunity, getAllCommunities } from '../controllers/community.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/', requireAuth, rateLimiter('community.create'), createCommunity);
router.get('/', rateLimiter('api.get'), getAllCommunities);

export default router;
