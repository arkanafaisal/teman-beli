import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCommunityModel = async (data) => {
  return await prisma.community.create({
    data
  });
};

export const getAllCommunitiesModel = async (category, q, status, userId) => {
  const where = {};
  
  if (category && category !== 'all') {
    const categories = category.split(',');
    where.category = { in: categories };
  }
  
  if (q) {
    where.title = { contains: q, mode: 'insensitive' };
  }

  if (status === 'inactive') {
    where.isDeleted = true;
  } else if (status === 'active') {
    where.isDeleted = false;
  } else if (!status) {
    // Default for public users
    where.isDeleted = false;
  }

  return await prisma.community.findMany({
    where,
    take: 30,
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

export const getCommunityByIdModel = async (id, userId) => {
  return await prisma.community.findUnique({
    where: { id },
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

export const updateCommunityModel = async (id, data) => {
  return await prisma.community.update({
    where: { id },
    data
  });
};

export const deleteCommunityModel = async (id, isDeleted = true) => {
  return await prisma.community.update({
    where: { id },
    data: { isDeleted }
  });
};

export const getUserCommunitiesModel = async (userId) => {
  return await prisma.community.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { name: true, department: true, rating: true, reviewCount: true } },
      _count: { select: { likes: true } },
      likes: { where: { userId }, select: { id: true } }
    }
  });
};
