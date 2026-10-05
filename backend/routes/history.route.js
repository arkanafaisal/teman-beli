import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { HistoryController } from '../controllers/history.controller.js';

const router = express.Router();

router.get('/', requireAuth, rateLimiter('api.get'), HistoryController.getAll);
router.get('/summary', requireAuth, rateLimiter('api.get'), HistoryController.getSummary);

export default router;
