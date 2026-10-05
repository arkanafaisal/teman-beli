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
    console.error(error);
    res.sendStatus(500);
  }
};

PatunganController.getAll = async (req, res) => {
  try {
    const filters = {
      search: req.query.q,
      category: req.query.category,
      hostId: req.query.hostId
    };
    const patungans = await PatunganModel.getAllPatungan(filters);
    res.status(200).json(patungans);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
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
    console.error(error);
    res.sendStatus(500);
  }
};

PatunganController.getDetail = async (req, res) => {
  try {
    const patungan = await PatunganModel.getPatunganDetail(req.params.id);
    if (!patungan) return res.sendStatus(404);
    res.status(200).json(patungan);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
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
    console.error(error);
    res.sendStatus(500);
  }
};


PatunganController.addLog = async (req, res) => {
  try {
    const existing = await PatunganModel.getPatunganById(req.params.id);
    if (!existing) return res.sendStatus(404);
    if (existing.hostId !== req.user.id) return res.sendStatus(403);

    if (!req.body.text || req.body.text.trim().length < 1) {
      return res.sendStatus(400); 
    }

    await PatunganModel.addLog(req.params.id, req.body.text);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

PatunganController.join = async (req, res) => {
  try {
    const { id } = req.params;
    const quota = parseInt(req.body.quota);
    
    if (isNaN(quota) || quota < 1) {
      return res.sendStatus(400);
    }

    const existing = await PatunganModel.getPatunganById(id);
    if (!existing) return res.sendStatus(404);
    if (existing.hostId === req.user.id) return res.sendStatus(403);

    // Check if already requested or joined
    const alreadyParticipated = await PatunganModel.checkParticipation(id, req.user.id);
    if (alreadyParticipated) {
      return res.sendStatus(409);
    }

    await PatunganModel.joinPatungan(id, req.user.id, quota);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

PatunganController.getParticipants = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await PatunganModel.getPatunganById(id);
    
    if (!existing) return res.sendStatus(404);
    if (existing.hostId !== req.user.id) {
      return res.sendStatus(403);
    }

    const participants = await PatunganModel.getParticipants(id);
    res.json({ success: true, payload: participants });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

PatunganController.updateParticipantStatus = async (req, res) => {
  try {
    const { id, participantId } = req.params;
    const { status } = req.body; // 'ACCEPTED' or 'REJECTED'
    
    if (!['ACCEPTED', 'REJECTED'].includes(status)) {
      return res.sendStatus(400);
    }

    const existing = await PatunganModel.getPatunganById(id);
    if (!existing) return res.sendStatus(404);
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
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

PatunganController.deleteParticipant = async (req, res) => {
  try {
    const { id, participantId } = req.params;

    const existing = await PatunganModel.getPatunganById(id);
    if (!existing) return res.sendStatus(404);
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
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
