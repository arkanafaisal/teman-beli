import { HistoryModel } from '../models/history.model.js';

export const HistoryController = {};

HistoryController.getAll = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const userId = req.user.id;
    
    const allParticipations = await HistoryModel.getAllParticipations(userId, limit);

    const activities = allParticipations.map(p => {
      const isHost = p.patungan.hostId === userId;
      const unitPrice = Math.ceil(p.patungan.totalPrice / p.patungan.targetQuota);
      
      let displayStatus = p.patungan.status;
      if (!isHost) {
        if (p.status === 'PENDING') displayStatus = 'PENDING';
        else if (p.status === 'REJECTED') displayStatus = 'REJECTED';
        // jika ACCEPTED, tampilkan status patungannya (OPEN/FULL/FINISHED/CANCELLED)
      }

      return {
        id: `${isHost ? 'h' : 'j'}_${p.id}`,
        type: isHost ? 'HOST' : 'JOIN',
        category: p.patungan.category,
        title: p.patungan.title,
        unitPrice: unitPrice,
        unit: p.patungan.unit,
        date: isHost ? p.patungan.createdAt : p.joinedAt,
        status: displayStatus,
        patunganStatus: p.patungan.status,
        participantStatus: p.status,
        proofLink: p.patungan.proofLink,
        isReviewed: p.patungan.reviews && p.patungan.reviews.length > 0,
        myReview: p.patungan.reviews?.[0] || null,
        hostId: p.patungan.hostId,
        patunganId: p.patungan.id,
        targetQuota: p.patungan.targetQuota,
        totalPrice: p.patungan.totalPrice,
        quota: p.quota // quota dari participant
      };
    });

    activities.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ success: true, payload: activities });
  } catch (error) {
    next(error);
  }
};

HistoryController.getSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const hostedCount = await HistoryModel.getHostedCount(userId);
    const joinedCount = await HistoryModel.getJoinedCount(userId);

    res.json({ success: true, payload: { hosted: hostedCount, joined: joinedCount } });
  } catch (error) {
    next(error);
  }
};
