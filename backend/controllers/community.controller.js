import { createCommunitySchema } from '../schemas/community.schema.js';
import { createCommunityModel } from '../models/community.model.js';

export const createCommunity = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.sendStatus(401);
    }

    const parseResult = createCommunitySchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.sendStatus(400);
    }

    const { judul, kategoriKey, lokasi, ringkasan, deskripsiLengkap } = parseResult.data;

    await createCommunityModel({
      title: judul,
      category: kategoriKey,
      location: lokasi,
      summary: ringkasan,
      description: deskripsiLengkap,
      authorId: user.id
    });

    return res.sendStatus(201);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.sendStatus(409);
    }
    console.error(error);
    return res.sendStatus(500);
  }
};
