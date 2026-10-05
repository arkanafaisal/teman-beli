import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { PatunganController } from '../controllers/patungan.controller.js';

const router = express.Router();

router.get('/', PatunganController.getAll); // Public route
router.get('/:id', PatunganController.getDetail); // Public route
router.post('/', requireAuth, PatunganController.create);
router.put('/:id', requireAuth, PatunganController.update);
router.post('/:id/log', requireAuth, PatunganController.addLog);

export default router;
