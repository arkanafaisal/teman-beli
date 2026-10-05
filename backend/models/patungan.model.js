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
            quota: data.currentQuota
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
  }
};
