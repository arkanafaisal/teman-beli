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
  }
};
