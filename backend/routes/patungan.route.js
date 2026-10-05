import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { PatunganController } from '../controllers/patungan.controller.js';

const router = express.Router();

router.get('/', rateLimiter('api.get'), PatunganController.getAll); // Public route
router.get('/:id', rateLimiter('api.get'), PatunganController.getDetail); // Public route
router.post('/', requireAuth, rateLimiter('patungan.create'), PatunganController.create);
router.put('/:id', requireAuth, rateLimiter('patungan.update'), PatunganController.update);
router.post('/:id/log', requireAuth, rateLimiter('patungan.addLog'), PatunganController.addLog);
router.post('/:id/join', requireAuth, rateLimiter('patungan.join'), PatunganController.join);
router.post('/:id/finish', requireAuth, rateLimiter('patungan.update'), PatunganController.finishPatungan);
router.patch('/:id/status', requireAuth, rateLimiter('patungan.update'), PatunganController.updateStatus);
router.get('/:id/participants', requireAuth, rateLimiter('api.get'), PatunganController.getParticipants);
router.patch('/:id/participants/:participantId', requireAuth, rateLimiter('patungan.update'), PatunganController.updateParticipantStatus);
router.delete('/:id/participants/:participantId', requireAuth, rateLimiter('patungan.update'), PatunganController.deleteParticipant);
router.post('/:id/reviews', requireAuth, rateLimiter('patungan.create'), PatunganController.addReview);
export default router;
