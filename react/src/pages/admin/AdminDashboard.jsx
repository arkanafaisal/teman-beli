import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminData } from '../../data/admin';
import { api } from '../../services/api';
import { toast } from 'sonner';
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await api.admin.getDashboard();
      if (res.success && res.payload) {
        setData(res.payload);
      } else {
        toast.error("Gagal memuat data metrik dashboard.");
      }
      setLoading(false);
    };
    fetchMetrics();
  }, []);

  if (loading || !data) {
    return (
      <AdminLayout title={adminData.dashboard.title}>
        <div className="flex justify-center items-center h-64 text-text-muted">
          <i className="ph ph-spinner animate-spin text-3xl mr-3"></i>
          <p>Memuat data analitik...</p>
        </div>
      </AdminLayout>
    );
  }

  // --- CHART DATA FORMATTING ---

  // User Pie Chart
  const userPieData = [
    { name: 'Aktif', value: data.users.active, color: '#22c55e' }, // green
    { name: 'Dihapus', value: data.users.deleted, color: '#ef4444' } // red
  ];

  // Patungan Status Pie
  const patunganStatusPieData = [
    { name: 'Berjalan', value: data.patungan.status.berjalan, color: '#3b82f6' }, // blue
    { name: 'Selesai', value: data.patungan.status.selesai, color: '#22c55e' },
    { name: 'Dihapus', value: data.patungan.status.dihapus, color: '#ef4444' }
  ];

  // Community Pie Chart
  const communityPieData = [
    { name: 'Aktif', value: data.community.active, color: '#22c55e' },
    { name: 'Dihapus', value: data.community.deleted, color: '#ef4444' }
  ];

  // Helper colors for categories
  const categoryColors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e', '#84cc16'];
  const patunganCategoryPieData = data.patungan.byCategory.map((cat, index) => ({
    name: cat.category,
    value: cat.count,
    color: categoryColors[index % categoryColors.length]
  }));

  // Custom Tooltip for Recharts to look modern
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-surface border border-border-base p-3 rounded-xl shadow-lg text-sm">
          <p className="font-bold text-text-heading mb-1">{`Tanggal ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="font-semibold">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-surface border border-border-base p-2 px-3 rounded-lg shadow-lg text-sm font-semibold" style={{ color: payload[0].payload.color }}>
          {`${payload[0].name}: ${payload[0].value}`}
        </div>
      );
    }
    return null;
  };

  return (
    <AdminLayout title={adminData.dashboard.title}>
      {/* --- PENGGUNA SECTION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <h2 className="text-lg font-bold text-text-heading flex items-center">
          <i className="ph ph-users text-primary-base mr-2"></i>Analitik Pengguna
        </h2>
        <div className="flex gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 bg-bg-surface border border-border-base rounded-full shadow-sm">
            Total: {data.users.total}
          </span>
          <span className="px-2.5 py-1 bg-success-soft text-success-text border border-success-subtle rounded-full shadow-sm">
            +{data.users.totalThisMonth} bulan ini
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2 bg-bg-surface border border-border-base rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-text-muted mb-4">Pendaftaran Bulan Ini</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.users.growthChart}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Pengguna Baru" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-bg-surface border border-border-base rounded-2xl p-5 shadow-sm flex flex-col items-center">
          <h3 className="text-sm font-semibold text-text-muted mb-4 w-full text-left">Status Pengguna</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={userPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                  {userPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- PATUNGAN SECTION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 mt-8">
        <h2 className="text-lg font-bold text-text-heading flex items-center">
          <i className="ph ph-handshake text-primary-base mr-2"></i>Analitik Patungan
        </h2>
        <div className="flex gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 bg-bg-surface border border-border-base rounded-full shadow-sm">
            Total: {data.patungan.total}
          </span>
          <span className="px-2.5 py-1 bg-success-soft text-success-text border border-success-subtle rounded-full shadow-sm">
            +{data.patungan.totalThisMonth} bulan ini
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-3 bg-bg-surface border border-border-base rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-text-muted mb-4">Patungan Dibuat Bulan Ini</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.patungan.growthChart}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Patungan Dibuat" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-bg-surface border border-border-base rounded-2xl p-5 shadow-sm flex flex-col items-center lg:col-span-1">
          <h3 className="text-sm font-semibold text-text-muted mb-4 w-full text-left">Status Patungan</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={patunganStatusPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                  {patunganStatusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-base rounded-2xl p-5 shadow-sm flex flex-col items-center lg:col-span-2">
          <h3 className="text-sm font-semibold text-text-muted mb-4 w-full text-left">Distribusi Kategori Patungan</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={patunganCategoryPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                  {patunganCategoryPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- KOMUNITAS SECTION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 mt-8">
        <h2 className="text-lg font-bold text-text-heading flex items-center">
          <i className="ph ph-users-three text-primary-base mr-2"></i>Analitik Komunitas
        </h2>
        <div className="flex gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 bg-bg-surface border border-border-base rounded-full shadow-sm">
            Total: {data.community.total}
          </span>
          <span className="px-2.5 py-1 bg-success-soft text-success-text border border-success-subtle rounded-full shadow-sm">
            +{data.community.totalThisMonth} bulan ini
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2 bg-bg-surface border border-border-base rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-text-muted mb-4">Komunitas Dibuat Bulan Ini</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.community.growthChart}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Komunitas Baru" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-bg-surface border border-border-base rounded-2xl p-5 shadow-sm flex flex-col items-center">
          <h3 className="text-sm font-semibold text-text-muted mb-4 w-full text-left">Status Komunitas</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={communityPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                  {communityPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </AdminLayout>
  );
}
