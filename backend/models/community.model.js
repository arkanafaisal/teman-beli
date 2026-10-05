import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCommunityModel = async (data) => {
  return await prisma.community.create({
    data
  });
};
