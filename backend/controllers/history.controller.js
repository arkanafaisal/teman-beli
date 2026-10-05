import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const HistoryController = {};

HistoryController.getAll = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const userId = req.user.id;
    
    // Cukup 1 query karena host juga pasti memiliki record di PatunganParticipant (dibuat otomatis saat patungan dibuat)
    const allParticipations = await prisma.patunganParticipant.findMany({
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

    const activities = allParticipations.map(p => {
      const isHost = p.patungan.hostId === userId;
      const unitPrice = Math.ceil(p.patungan.totalPrice / p.patungan.targetQuota);
      return {
        id: `${isHost ? 'h' : 'j'}_${p.id}`,
        type: isHost ? 'HOST' : 'JOIN',
        category: p.patungan.category,
        title: p.patungan.title,
        unitPrice: unitPrice,
        unit: p.patungan.unit,
        date: isHost ? p.patungan.createdAt : p.joinedAt,
        status: isHost ? p.patungan.status : p.status,
        proofLink: p.patungan.proofLink,
        isReviewed: p.patungan.reviews && p.patungan.reviews.length > 0,
        hostId: p.patungan.hostId,
        patunganId: p.patungan.id,
        targetQuota: p.patungan.targetQuota,
        totalPrice: p.patungan.totalPrice,
        quota: p.quota // quota dari participant
      };
    });

    // Urutkan kembali berdasarkan tanggal karena tanggal host menggunakan createdAt patungan
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ success: true, payload: activities });
  } catch (error) {
    next(error);
  }
};

HistoryController.getSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const hostedCount = await prisma.patungan.count({
      where: { 
        hostId: userId,
        status: { not: 'CANCELLED' }
      }
    });

    const joinedCount = await prisma.patunganParticipant.count({
      where: { 
        userId: userId,
        patungan: { 
          hostId: { not: userId },
          status: { not: 'CANCELLED' }
        }
      }
    });

    res.json({ success: true, payload: { hosted: hostedCount, joined: joinedCount } });
  } catch (error) {
    next(error);
  }
};
