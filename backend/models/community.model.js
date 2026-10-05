import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCommunityModel = async (data) => {
  return await prisma.community.create({
    data
  });
};

export const getAllCommunitiesModel = async (category, q) => {
  const where = {};
  
  if (category && category !== 'all') {
    const categories = category.split(',');
    where.category = { in: categories };
  }
  
  if (q) {
    where.title = { contains: q, mode: 'insensitive' };
  }

  return await prisma.community.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { 
      author: { select: { name: true, department: true, rating: true, reviewCount: true } },
      comments: {
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true } } }
      }
    }
  });
};

export const createCommunityCommentModel = async (data) => {
  return await prisma.communityComment.create({
    data
  });
};
