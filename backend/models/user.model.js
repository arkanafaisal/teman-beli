import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
export const UserModel = {};

UserModel.getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      department: true,
      rating: true
    }
  });
};

UserModel.getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

UserModel.getUserWithPassword = async (email) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

UserModel.createUser = async (email, name) => {
  return await prisma.user.create({
    data: {
      email,
      name
    }
  });
};

UserModel.updatePassword = async (userId, plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  
  return await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword }
  });
};

UserModel.getReviewsByHost = async (userId, limit) => {
  return await prisma.review.findMany({
    where: { hostId: userId },
    include: {
      reviewer: {
        select: { name: true, department: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: limit
  });
};
