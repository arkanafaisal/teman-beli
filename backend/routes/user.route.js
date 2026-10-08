import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { validate } from '../middlewares/validation.middleware.js';
import { updateProfileSchema, deleteProfileSchema } from '../schemas/auth.schema.js';

import { userQuerySchema } from '../schemas/user.schema.js';
import { idParamSchema } from '../schemas/common.schema.js';

const router = express.Router();

// Admin Endpoints
router.get('/', requireAuth, rateLimiter('user.getAll'), validate({ query: userQuerySchema }), UserController.getAllUsers);

// Normal User Endpoints
router.get('/profile', requireAuth, rateLimiter('user.getProfile'), UserController.getProfile);
router.put('/profile', requireAuth, rateLimiter('user.updateProfile'), validate({ body: updateProfileSchema }), UserController.updateProfile);
router.get('/reviews', requireAuth, rateLimiter('user.getReviews'), UserController.getReviews);
router.get('/communities', requireAuth, rateLimiter('user.getCommunities'), UserController.getUserCommunities);

// Unified Delete Endpoint (For Admin & Normal User)
router.delete('/:id', requireAuth, rateLimiter('user.delete'), validate({ params: idParamSchema, body: deleteProfileSchema }), UserController.deleteUser);

export default router;
