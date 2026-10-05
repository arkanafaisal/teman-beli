import { PrismaClient } from '@prisma/client';

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
