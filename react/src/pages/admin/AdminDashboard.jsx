import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminData } from '../../data/admin';

export default function AdminDashboard() {
  return (
    <AdminLayout title={adminData.dashboard.title}>

      {/*  RINGKASAN STATISTIK  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-bg-surface p-5 rounded-2xl border border-border-base shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{adminData.dashboard.stats.activePatunganLabel}</p>
            <h3 className="text-2xl font-bold text-text-heading mt-1">32 Projek</h3>
            <span className="inline-flex items-center text-xs font-medium text-primary-text mt-1">
              8 Kategori
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-primary-soft text-primary-text flex items-center justify-center text-2xl">
            <i className="ph ph-handshake"></i>
          </div>
        </div>

        <div className="bg-bg-surface p-5 rounded-2xl border border-border-base shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{adminData.dashboard.stats.totalUsersLabel}</p>
            <h3 className="text-2xl font-bold text-text-heading mt-1">1,240</h3>
            <span className="inline-flex items-center text-xs font-medium text-primary-text mt-1">
              +12 Mahasiswa/hari
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-primary-soft text-primary-text flex items-center justify-center text-2xl">
            <i className="ph ph-users font-bold"></i>
          </div>
        </div>

        <div className="bg-bg-surface p-5 rounded-2xl border border-border-base shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{adminData.dashboard.stats.totalReviewsLabel}</p>
            <h3 className="text-2xl font-bold text-text-heading mt-1">458</h3>
            <span className="inline-flex items-center text-xs font-medium text-warning-base mt-1">
              ★ 4.8 / 5.0 Rata-rata
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-warning-soft text-warning-text flex items-center justify-center text-2xl">
            <i className="ph ph-star"></i>
          </div>
        </div>

        <div className="bg-bg-surface p-5 rounded-2xl border border-border-base shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{adminData.dashboard.stats.communityLabel}</p>
            <h3 className="text-2xl font-bold text-text-heading mt-1">14 Grup</h3>
            <span className="inline-flex items-center text-xs font-medium text-primary-text mt-1">
              Aktif Diskusi
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-primary-soft text-primary-text flex items-center justify-center text-2xl">
            <i className="ph ph-users-three"></i>
          </div>
        </div>
      </div>



    </AdminLayout>
  );
}
