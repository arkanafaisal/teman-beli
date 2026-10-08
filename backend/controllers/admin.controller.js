import { AdminModel } from '../models/admin.model.js';

export const AdminController = {};

AdminController.getDashboardMetrics = async (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    // First day of current month
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // --- USERS ---
    const { totalUsers, activeUsers, newUsersThisMonth, usersThisMonthData } = await AdminModel.getUsersMetrics(startOfMonth);
    const deletedUsers = totalUsers - activeUsers;

    const userRegistrationByDay = {};
    usersThisMonthData.forEach(u => {
      const day = u.createdAt.getDate();
      userRegistrationByDay[day] = (userRegistrationByDay[day] || 0) + 1;
    });

    const userChartData = [];
    for (let i = 1; i <= daysInMonth; i++) {
      userChartData.push({
        day: i,
        count: userRegistrationByDay[i] || 0
      });
    }

    // --- PATUNGAN ---
    const { totalPatungan, newPatunganThisMonth, patunganStatusGroups, patunganCategoryGroups, patunganThisMonthData } = await AdminModel.getPatunganMetrics(startOfMonth);

    let openPatungan = 0;
    let fullPatungan = 0;
    let finishedPatungan = 0;
    let cancelledPatungan = 0;

    patunganStatusGroups.forEach(g => {
      if (g.status === 'OPEN') openPatungan += g._count._all;
      else if (g.status === 'FULL') fullPatungan += g._count._all;
      else if (g.status === 'FINISHED') finishedPatungan += g._count._all;
      else if (g.status === 'CANCELLED') cancelledPatungan += g._count._all;
    });

    const patunganByCategory = patunganCategoryGroups.map(g => ({
      category: g.category,
      count: g._count._all
    }));

    const patunganByDay = {};
    patunganThisMonthData.forEach(p => {
      const day = p.createdAt.getDate();
      patunganByDay[day] = (patunganByDay[day] || 0) + 1;
    });
    const patunganChartData = [];
    for (let i = 1; i <= daysInMonth; i++) {
      patunganChartData.push({
        day: i,
        count: patunganByDay[i] || 0
      });
    }

    // --- COMMUNITY ---
    const { totalCommunity, newCommunityThisMonth, activeCommunity, communityCategoryGroups, communityThisMonthData } = await AdminModel.getCommunityMetrics(startOfMonth);
    const deletedCommunity = totalCommunity - activeCommunity;

    const communityByCategory = communityCategoryGroups.map(g => ({
      category: g.category,
      count: g._count._all
    }));

    const communityByDay = {};
    communityThisMonthData.forEach(c => {
      const day = c.createdAt.getDate();
      communityByDay[day] = (communityByDay[day] || 0) + 1;
    });
    const communityChartData = [];
    for (let i = 1; i <= daysInMonth; i++) {
      communityChartData.push({
        day: i,
        count: communityByDay[i] || 0
      });
    }

    const payload = {
      users: {
        total: totalUsers,
        totalThisMonth: newUsersThisMonth,
        active: activeUsers,
        deleted: deletedUsers,
        growthChart: userChartData
      },
      patungan: {
        total: totalPatungan,
        totalThisMonth: newPatunganThisMonth,
        status: {
          berjalan: openPatungan + fullPatungan,
          selesai: finishedPatungan,
          dihapus: cancelledPatungan
        },
        byCategory: patunganByCategory,
        growthChart: patunganChartData
      },
      community: {
        total: totalCommunity,
        totalThisMonth: newCommunityThisMonth,
        active: activeCommunity,
        deleted: deletedCommunity,
        byCategory: communityByCategory,
        growthChart: communityChartData
      }
    };

    res.status(200).json({ success: true, payload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Gagal mengambil metrik dashboard' });
  }
};
