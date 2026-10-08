import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { AdminController } from '../controllers/admin.controller.js';

const router = express.Router();

router.use(requireAuth);

// Check admin role
router.use((req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.sendStatus(403);
  }
  next();
});

router.get('/dashboard', rateLimiter('admin.getDashboard'), AdminController.getDashboardMetrics);

export default router;
