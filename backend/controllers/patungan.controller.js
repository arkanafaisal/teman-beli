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
