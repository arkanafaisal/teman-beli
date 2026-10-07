import { Router } from 'express';
import { createCommunity, getAllCommunities, getCommunityDetail, addComment, toggleLike } from '../controllers/community.controller.js';
import { requireAuth, optionalAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createCommunitySchema, createCommunityCommentSchema } from '../schemas/community.schema.js';

const router = Router();

router.post('/', requireAuth, rateLimiter('community.create'), validate(createCommunitySchema), createCommunity);
router.get('/', optionalAuth, rateLimiter('api.get'), getAllCommunities);
router.get('/:id', optionalAuth, rateLimiter('api.get'), getCommunityDetail);
router.post('/:id/comments', requireAuth, rateLimiter('community.comment'), validate(createCommunityCommentSchema), addComment);
router.post('/:id/like', requireAuth, rateLimiter('community.like'), toggleLike);

export default router;
