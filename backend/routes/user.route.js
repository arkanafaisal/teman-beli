import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { validate } from '../middlewares/validation.middleware.js';
import { updateProfileSchema, deleteProfileSchema } from '../schemas/auth.schema.js';

const router = express.Router();

router.get('/profile', requireAuth, rateLimiter('user.getProfile'), UserController.getProfile);
router.put('/profile', requireAuth, rateLimiter('user.updateProfile'), validate({ body: updateProfileSchema }), UserController.updateProfile);
router.delete('/profile', requireAuth, rateLimiter('user.deleteProfile'), validate({ body: deleteProfileSchema }), UserController.deleteProfile);
router.get('/reviews', requireAuth, rateLimiter('user.getReviews'), UserController.getReviews);
router.get('/communities', requireAuth, rateLimiter('user.getCommunities'), UserController.getUserCommunities);

export default router;
