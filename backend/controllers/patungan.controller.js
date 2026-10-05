import { z } from 'zod';
import { patunganSchema, updatePatunganSchema } from '../schemas/patungan.schema.js';
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
