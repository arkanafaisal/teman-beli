import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { setPasswordSchema } from '../schemas/auth.schema.js';

const prisma = new PrismaClient();
export const UserController = {};

UserController.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        department: true,
        rating: true
      }
    });

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

UserController.setPassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const validatedData = setPasswordSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.sendStatus(400);
    }

    const { password } = validatedData.data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

UserController.getReviews = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;

    const reviews = await prisma.review.findMany({
      where: { hostId: userId },
      include: {
        reviewer: {
          select: { name: true, department: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    res.status(200).json({ success: true, payload: reviews });
  } catch (error) {
    next(error);
  }
};
