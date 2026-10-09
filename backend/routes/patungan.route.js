import express from 'express';
import { requireAuth, optionalAuth } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { PatunganController } from '../controllers/patungan.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { patunganSchema, updatePatunganSchema, finishPatunganSchema, updatePatunganStatusSchema, addPatunganLogSchema, joinPatunganSchema, updateParticipantStatusSchema, patunganQuerySchema, participantParamSchema } from '../schemas/patungan.schema.js';
import { createReviewSchema } from '../schemas/review.schema.js';
import { idParamSchema } from '../schemas/common.schema.js';

const router = express.Router();

router.get('/', rateLimiter('patungan.getAll'), validate({ query: patunganQuerySchema }), PatunganController.getAll); // Public route
router.get('/:id', optionalAuth, rateLimiter('patungan.getDetail'), validate({ params: idParamSchema }), PatunganController.getDetail); // Public route
router.post('/', requireAuth, rateLimiter('patungan.create'), validate({ body: patunganSchema }), PatunganController.create);
router.put('/:id', requireAuth, rateLimiter('patungan.update'), validate({ params: idParamSchema, body: updatePatunganSchema }), PatunganController.update);
router.post('/:id/log', requireAuth, rateLimiter('patungan.addLog'), validate({ params: idParamSchema, body: addPatunganLogSchema }), PatunganController.addLog);
router.post('/:id/join', requireAuth, rateLimiter('patungan.join'), validate({ params: idParamSchema, body: joinPatunganSchema }), PatunganController.join);
router.post('/:id/finish', requireAuth, rateLimiter('patungan.finish'), validate({ params: idParamSchema, body: finishPatunganSchema }), PatunganController.finishPatungan);
router.patch('/:id/status', requireAuth, rateLimiter('patungan.updateStatus'), validate({ params: idParamSchema, body: updatePatunganStatusSchema }), PatunganController.updateStatus);
router.get('/:id/participants', requireAuth, rateLimiter('patungan.getParticipants'), validate({ params: idParamSchema }), PatunganController.getParticipants);
router.patch('/:id/participants/:participantId', requireAuth, rateLimiter('patungan.updateParticipantStatus'), validate({ params: participantParamSchema, body: updateParticipantStatusSchema }), PatunganController.updateParticipantStatus);
router.delete('/:id/participants/:participantId', requireAuth, rateLimiter('patungan.deleteParticipant'), validate({ params: participantParamSchema }), PatunganController.deleteParticipant);
router.post('/:id/reviews', requireAuth, rateLimiter('patungan.addReview'), validate({ params: idParamSchema, body: createReviewSchema }), PatunganController.addReview);
export default router;
