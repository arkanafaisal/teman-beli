import { Router } from 'express';
import { createCommunity, getAllCommunities, addComment } from '../controllers/community.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/', requireAuth, rateLimiter('community.create'), createCommunity);
router.get('/', rateLimiter('api.get'), getAllCommunities);
router.post('/:id/comments', requireAuth, rateLimiter('community.comment'), addComment);

export default router;
