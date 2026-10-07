import { z } from 'zod';
import { patunganSchema, updatePatunganSchema, finishPatunganSchema } from '../schemas/patungan.schema.js';
import { PatunganModel } from '../models/patungan.model.js';

export const PatunganController = {};

PatunganController.create = async (req, res) => {
  try {
    const validatedData = patunganSchema.parse(req.body);
    const userId = req.user.id; 

    await PatunganModel.createPatungan(validatedData, userId);

    res.sendStatus(201); 
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.sendStatus(400); 
    }
    throw error;
  }
};

PatunganController.getAll = async (req, res) => {
  const filters = {
    search: req.query.q,
    category: req.query.category,
    hostId: req.query.hostId
  };
  const patungans = await PatunganModel.getAllPatungan(filters);
  res.status(200).json(patungans);
};

PatunganController.update = async (req, res) => {
  try {
    const validatedData = updatePatunganSchema.parse(req.body);
    const userId = req.user.id;

    const existing = await PatunganModel.getPatunganById(req.params.id);
    if (!existing) return res.sendStatus(404);
    if (existing.hostId !== userId) return res.sendStatus(403); // Hanya host yang boleh update

    await PatunganModel.updatePatungan(req.params.id, validatedData);
    res.sendStatus(200);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.sendStatus(400); 
    }
    throw error;
  }
};

PatunganController.getDetail = async (req, res) => {
  const patungan = await PatunganModel.getPatunganDetail(req.params.id);
  if (!patungan) return res.sendStatus(404);
  res.status(200).json(patungan);
};

PatunganController.finishPatungan = async (req, res) => {
  try {
    const validatedData = finishPatunganSchema.parse(req.body);
    const userId = req.user.id;
    const { id } = req.params;

    const existing = await PatunganModel.getPatunganById(id);
    if (!existing) return res.sendStatus(404);
    if (existing.hostId !== userId) return res.sendStatus(403);
    
    if (existing.status === 'FINISHED') return res.sendStatus(400); // Already finished

    await PatunganModel.finishPatungan(id, validatedData.proofLink);
    res.sendStatus(200);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.sendStatus(400); 
    }
    throw error;
  }
};

PatunganController.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const existing = await PatunganModel.getPatunganById(id);
  
  if (!existing) return res.sendStatus(404);
  if (existing.hostId !== req.user.id) return res.sendStatus(403);
  
  const validStatuses = ['OPEN', 'FULL', 'FINISHED', 'CANCELLED'];
  if (!validStatuses.includes(status)) return res.sendStatus(400);

  await PatunganModel.updateStatus(id, status);
  res.sendStatus(200);
};


PatunganController.addLog = async (req, res) => {
  const existing = await PatunganModel.getPatunganById(req.params.id);
  if (!existing) return res.sendStatus(404);
  if (existing.hostId !== req.user.id) return res.sendStatus(403);

  if (!req.body.text || req.body.text.trim().length < 1) {
    return res.sendStatus(400); 
  }

  await PatunganModel.addLog(req.params.id, req.body.text);
  res.sendStatus(201);
};

PatunganController.join = async (req, res) => {
  const { id } = req.params;
  const quota = parseInt(req.body.quota);
  
  if (isNaN(quota) || quota < 1) {
    return res.sendStatus(400);
  }

  const existing = await PatunganModel.getPatunganById(id);
  if (!existing) return res.sendStatus(404);
  if (existing.status === 'FINISHED' || existing.status === 'CANCELLED') return res.sendStatus(400);
  if (existing.hostId === req.user.id) return res.sendStatus(403);

  // Check if already requested or joined
  const alreadyParticipated = await PatunganModel.checkParticipation(id, req.user.id);
  if (alreadyParticipated) {
    return res.sendStatus(409);
  }

  if (existing.currentQuota + quota > existing.targetQuota) {
    return res.sendStatus(400); // 400 for bad request (quota exceeded)
  }

  await PatunganModel.joinPatungan(id, req.user.id, quota);
  res.sendStatus(201);
};

PatunganController.getParticipants = async (req, res) => {
  const { id } = req.params;
  const existing = await PatunganModel.getPatunganById(id);
  
  if (!existing) return res.sendStatus(404);
  if (existing.hostId !== req.user.id) {
    return res.sendStatus(403);
  }

  const participants = await PatunganModel.getParticipants(id);
  res.json({ success: true, payload: participants });
};

PatunganController.updateParticipantStatus = async (req, res) => {
  const { id, participantId } = req.params;
  const { status } = req.body; // 'ACCEPTED' or 'REJECTED'
  
  if (!['ACCEPTED', 'REJECTED'].includes(status)) {
    return res.sendStatus(400);
  }

  const existing = await PatunganModel.getPatunganById(id);
  if (!existing) return res.sendStatus(404);
  if (existing.status === 'FINISHED' || existing.status === 'CANCELLED') return res.sendStatus(400);
  if (existing.hostId !== req.user.id) {
    return res.sendStatus(403);
  }

  const participant = await PatunganModel.getParticipantById(participantId);
  if (!participant) return res.sendStatus(404);
  if (participant.userId === existing.hostId) {
    return res.sendStatus(400); // Host tidak dapat diubah statusnya
  }

  await PatunganModel.updateParticipantStatus(participantId, status);
  res.sendStatus(200);
};

PatunganController.deleteParticipant = async (req, res) => {
  const { id, participantId } = req.params;

  const existing = await PatunganModel.getPatunganById(id);
  if (!existing) return res.sendStatus(404);
  if (existing.status === 'FINISHED' || existing.status === 'CANCELLED') return res.sendStatus(400);
  if (existing.hostId !== req.user.id) {
    return res.sendStatus(403);
  }

  const participant = await PatunganModel.getParticipantById(participantId);
  if (!participant) return res.sendStatus(404);
  if (participant.userId === existing.hostId) {
    return res.sendStatus(400); // Host tidak dapat dihapus
  }

  await PatunganModel.deleteParticipant(participantId);
  res.sendStatus(200);
};

PatunganController.addReview = async (req, res) => {
  try {
    const { createReviewSchema } = await import('../schemas/review.schema.js');
    const validatedData = createReviewSchema.parse(req.body);
    const { id } = req.params;
    const userId = req.user.id;

    const existing = await PatunganModel.getPatunganById(id);
    if (!existing) return res.sendStatus(404);
    if (existing.status !== 'FINISHED') return res.sendStatus(400);
    
    // Cegah host rating diri sendiri
    if (existing.hostId === userId) return res.sendStatus(403);

    const participant = await PatunganModel.checkParticipation(id, userId);
    if (!participant || participant.status !== 'ACCEPTED') {
      return res.sendStatus(403);
    }

    const alreadyReviewed = await PatunganModel.checkReview(id, userId);
    if (alreadyReviewed) {
      return res.sendStatus(409);
    }

    await PatunganModel.createReview(id, userId, existing.hostId, validatedData.rating, validatedData.comment);
    res.sendStatus(201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.sendStatus(400);
    }
    throw error;
  }
};
