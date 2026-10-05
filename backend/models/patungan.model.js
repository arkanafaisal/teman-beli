import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PatunganModel = {
  createPatungan: async (data, userId) => {
    return await prisma.patungan.create({
      data: {
        title: data.title,
        category: data.category,
        unit: data.unit,
        targetQuota: data.targetQuota,
        totalPrice: data.totalPrice,
        currentQuota: data.currentQuota,
        area: data.area,
        deadline: new Date(data.deadline),
        whatsapp: data.whatsapp,
        notes: data.notes,
        refLink: data.refLink || null,
        hostId: userId,
        status: data.currentQuota === data.targetQuota ? 'FULL' : 'OPEN',
        participants: {
          create: {
            userId: userId,
            quota: data.currentQuota,
            status: 'ACCEPTED'
          }
        }
      }
    });
  },
  getAllPatungan: async (filters = {}) => {
    const { search, category, hostId } = filters;
    
    let whereClause = {};
    
    if (category) {
      const categoriesArray = category.split(',');
      if (categoriesArray.length > 0) {
        whereClause.category = { in: categoriesArray };
      }
    }
    
    if (hostId) {
      whereClause.hostId = hostId;
    } else {
      whereClause.status = { notIn: ['FINISHED', 'CANCELLED'] };
    }
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { host: { name: { contains: search, mode: 'insensitive' } } }
      ];
    }

    return await prisma.patungan.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        host: {
          select: { name: true, department: true }
        }
      }
    });
  },
  getPatunganDetail: async (id) => {
    return await prisma.patungan.findUnique({
      where: { id },
      include: {
        host: {
          select: { name: true, department: true }
        },
        logs: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  },
  getPatunganById: async (id) => {
    return await prisma.patungan.findUnique({ where: { id } });
  },
  updatePatungan: async (id, data) => {
    return await prisma.patungan.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category,
        unit: data.unit,
        targetQuota: data.targetQuota,
        totalPrice: data.totalPrice,
        currentQuota: data.currentQuota,
        area: data.area,
        deadline: new Date(data.deadline),
        whatsapp: data.whatsapp,
        notes: data.notes,
        refLink: data.refLink || null,
        status: data.currentQuota >= data.targetQuota ? 'FULL' : 'OPEN',
        logs: {
          create: {
            text: data.updateComment
          }
        }
      }
    });
  },

  addLog: async (id, text) => {
    return await prisma.patunganLog.create({
      data: {
        patunganId: id,
        text
      }
    });
  },

  finishPatungan: async (id, proofLink) => {
    return await prisma.patungan.update({
      where: { id },
      data: {
        status: 'FINISHED',
        proofLink: proofLink
      }
    });
  },

  updateStatus: async (id, status) => {
    return await prisma.patungan.update({
      where: { id },
      data: { status }
    });
  },

  joinPatungan: async (patunganId, userId, quota) => {
    return await prisma.$transaction(async (tx) => {
      const participant = await tx.patunganParticipant.create({
        data: {
          patunganId,
          userId,
          quota,
          status: 'PENDING'
        }
      });

      const activeParticipants = await tx.patunganParticipant.findMany({
        where: { patunganId, status: { in: ['ACCEPTED', 'PENDING'] } }
      });
      const newQuota = activeParticipants.reduce((sum, p) => sum + p.quota, 0);

      const patungan = await tx.patungan.findUnique({ where: { id: patunganId } });
      let newStatus = patungan.status;
      if (patungan.status !== 'FINISHED' && patungan.status !== 'CANCELLED') {
        newStatus = newQuota >= patungan.targetQuota ? 'FULL' : 'OPEN';
      }

      await tx.patungan.update({
        where: { id: patunganId },
        data: { currentQuota: newQuota, status: newStatus }
      });

      return participant;
    });
  },

  checkParticipation: async (patunganId, userId) => {
    return await prisma.patunganParticipant.findFirst({
      where: {
        patunganId,
        userId
      }
    });
  },

  getParticipantById: async (participantId) => {
    return await prisma.patunganParticipant.findUnique({
      where: { id: participantId }
    });
  },

  getParticipants: async (patunganId) => {
    return await prisma.patunganParticipant.findMany({
      where: { patunganId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { joinedAt: 'asc' }
    });
  },

  updateParticipantStatus: async (participantId, status) => {
    return await prisma.$transaction(async (tx) => {
      const participant = await tx.patunganParticipant.update({
        where: { id: participantId },
        data: { status }
      });

      const activeParticipants = await tx.patunganParticipant.findMany({
        where: { patunganId: participant.patunganId, status: { in: ['ACCEPTED', 'PENDING'] } }
      });
      const newQuota = activeParticipants.reduce((sum, p) => sum + p.quota, 0);

      const patungan = await tx.patungan.findUnique({ where: { id: participant.patunganId } });
      let newStatus = patungan.status;
      if (patungan.status !== 'FINISHED' && patungan.status !== 'CANCELLED') {
        newStatus = newQuota >= patungan.targetQuota ? 'FULL' : 'OPEN';
      }

      await tx.patungan.update({
        where: { id: participant.patunganId },
        data: { currentQuota: newQuota, status: newStatus }
      });

      return participant;
    });
  },

  deleteParticipant: async (participantId) => {
    return await prisma.$transaction(async (tx) => {
      const participant = await tx.patunganParticipant.delete({
        where: { id: participantId }
      });

      const activeParticipants = await tx.patunganParticipant.findMany({
        where: { patunganId: participant.patunganId, status: { in: ['ACCEPTED', 'PENDING'] } }
      });
      const newQuota = activeParticipants.reduce((sum, p) => sum + p.quota, 0);

      const patungan = await tx.patungan.findUnique({ where: { id: participant.patunganId } });
      let newStatus = patungan.status;
      if (patungan.status !== 'FINISHED' && patungan.status !== 'CANCELLED') {
        newStatus = newQuota >= patungan.targetQuota ? 'FULL' : 'OPEN';
      }

      await tx.patungan.update({
        where: { id: participant.patunganId },
        data: { currentQuota: newQuota, status: newStatus }
      });

      return participant;
    });
  }
};
