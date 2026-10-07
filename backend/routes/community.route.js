import { Router } from 'express';
import { createCommunity, getAllCommunities, getCommunityDetail, addComment, toggleLike } from '../controllers/community.controller.js';
import { requireAuth, optionalAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createCommunitySchema, createCommunityCommentSchema, communityQuerySchema } from '../schemas/community.schema.js';
import { idParamSchema } from '../schemas/common.schema.js';

const router = Router();

router.post('/', requireAuth, rateLimiter('community.create'), validate({ body: createCommunitySchema }), createCommunity);
router.get('/', optionalAuth, rateLimiter('community.getAll'), validate({ query: communityQuerySchema }), getAllCommunities);
router.get('/:id', optionalAuth, rateLimiter('community.getDetail'), validate({ params: idParamSchema }), getCommunityDetail);
router.post('/:id/comments', requireAuth, rateLimiter('community.addComment'), validate({ params: idParamSchema, body: createCommunityCommentSchema }), addComment);
router.post('/:id/like', requireAuth, rateLimiter('community.toggleLike'), validate({ params: idParamSchema }), toggleLike);

export default router;
