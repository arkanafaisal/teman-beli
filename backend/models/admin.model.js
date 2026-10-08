import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const AdminModel = {};

AdminModel.getUsersMetrics = async (startOfMonth) => {
  const totalUsers = await prisma.user.count();
  const activeUsers = await prisma.user.count({ where: { isDeleted: false } });
  
  const newUsersThisMonth = await prisma.user.count({
    where: { createdAt: { gte: startOfMonth } }
  });

  const usersThisMonthData = await prisma.user.findMany({
    where: { createdAt: { gte: startOfMonth } },
    select: { createdAt: true }
  });

  return { totalUsers, activeUsers, newUsersThisMonth, usersThisMonthData };
};

AdminModel.getPatunganMetrics = async (startOfMonth) => {
  const totalPatungan = await prisma.patungan.count();
  const newPatunganThisMonth = await prisma.patungan.count({
    where: { createdAt: { gte: startOfMonth } }
  });

  const patunganStatusGroups = await prisma.patungan.groupBy({
    by: ['status'],
    _count: { _all: true }
  });

  const patunganCategoryGroups = await prisma.patungan.groupBy({
    by: ['category'],
    _count: { _all: true }
  });

  const patunganThisMonthData = await prisma.patungan.findMany({
    where: { createdAt: { gte: startOfMonth } },
    select: { createdAt: true }
  });

  return { totalPatungan, newPatunganThisMonth, patunganStatusGroups, patunganCategoryGroups, patunganThisMonthData };
};

AdminModel.getCommunityMetrics = async (startOfMonth) => {
  const totalCommunity = await prisma.community.count();
  const newCommunityThisMonth = await prisma.community.count({
    where: { createdAt: { gte: startOfMonth } }
  });

  const activeCommunity = await prisma.community.count({ where: { isDeleted: false } });

  const communityCategoryGroups = await prisma.community.groupBy({
    by: ['category'],
    _count: { _all: true }
  });

  const communityThisMonthData = await prisma.community.findMany({
    where: { createdAt: { gte: startOfMonth } },
    select: { createdAt: true }
  });

  return { totalCommunity, newCommunityThisMonth, activeCommunity, communityCategoryGroups, communityThisMonthData };
};
