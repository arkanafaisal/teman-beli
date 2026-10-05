import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCommunityModel = async (data) => {
  return await prisma.community.create({
    data
  });
};

export const getAllCommunitiesModel = async (category, q, userId) => {
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
      },
      _count: { select: { likes: true } },
      likes: userId ? { where: { userId }, select: { id: true } } : false
    }
  });
};

export const createCommunityCommentModel = async (data) => {
  return await prisma.communityComment.create({
    data
  });
};

export const toggleCommunityLikeModel = async (communityId, userId) => {
  const existingLike = await prisma.communityLike.findUnique({
    where: {
      userId_communityId: {
        userId,
        communityId
      }
    }
  });

  if (existingLike) {
    await prisma.communityLike.delete({
      where: { id: existingLike.id }
    });
    return { isLiked: false };
  } else {
    await prisma.communityLike.create({
      data: {
        userId,
        communityId
      }
    });
    return { isLiked: true };
  }
};
