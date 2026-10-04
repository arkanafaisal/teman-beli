import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { PatunganController } from '../controllers/patungan.controller.js';

const router = express.Router();

router.post('/', requireAuth, PatunganController.create);

export default router;
