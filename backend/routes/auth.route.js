import express from 'express';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { AuthController } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { loginManualSchema, loginGoogleSchema } from '../schemas/auth.schema.js';

const router = express.Router();

router.post('/login', rateLimiter('auth.login'), validate({ body: loginGoogleSchema }), AuthController.login);
router.post('/login-manual', rateLimiter('auth.login'), validate({ body: loginManualSchema }), AuthController.loginManual);
router.post('/logout', rateLimiter('auth.logout'), AuthController.logout);
router.post('/refresh', rateLimiter('auth.refresh'), AuthController.refresh);

export default router;
