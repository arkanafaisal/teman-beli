import { z } from 'zod';
import { patunganSchema } from '../schemas/patungan.schema.js';
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
    const patungans = await PatunganModel.getAllPatungan();
    // Mengirim JSON data karena GET request membutuhkan balasan payload
    res.status(200).json(patungans);
  } catch (error) {
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
