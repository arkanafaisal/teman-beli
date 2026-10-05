import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const HistoryModel = {};

HistoryModel.getAllParticipations = async (userId, limit) => {
  return await prisma.patunganParticipant.findMany({
    where: { 
      userId: userId,
      patungan: { status: { not: 'CANCELLED' } }
    },
    include: { 
      patungan: {
        include: {
          reviews: {
            where: { reviewerId: userId }
          }
        }
      } 
    },
    orderBy: { joinedAt: 'desc' },
    take: limit
  });
};

HistoryModel.getHostedCount = async (userId) => {
  return await prisma.patungan.count({
    where: { 
      hostId: userId,
      status: { not: 'CANCELLED' }
    }
  });
};

HistoryModel.getJoinedCount = async (userId) => {
  return await prisma.patunganParticipant.count({
    where: { 
      userId: userId,
      patungan: { 
        hostId: { not: userId },
        status: { not: 'CANCELLED' }
      }
    }
  });
};
