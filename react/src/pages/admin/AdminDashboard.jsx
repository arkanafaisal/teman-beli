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

      {/*  MANAJEMEN PATUNGAN & KATEGORI  */}
      <section className="bg-bg-surface rounded-2xl border border-border-base shadow-sm p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-text-heading text-base sm:text-lg">{adminData.dashboard.activeProjects.title}</h3>
            <p className="text-xs text-text-muted">{adminData.dashboard.activeProjects.subtitle}</p>
          </div>
          <button className="px-4 py-2 bg-primary-base hover:bg-primary-hover text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary-ring/20 transition self-start sm:self-auto">
            {adminData.dashboard.activeProjects.addBtn}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-subtle text-text-muted text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">{adminData.dashboard.activeProjects.tableHeaders.item}</th>
                <th className="px-4 py-3">{adminData.dashboard.activeProjects.tableHeaders.category}</th>
                <th className="px-4 py-3">{adminData.dashboard.activeProjects.tableHeaders.target}</th>
                <th className="px-4 py-3">{adminData.dashboard.activeProjects.tableHeaders.progress}</th>
                <th className="px-4 py-3 text-right">{adminData.dashboard.activeProjects.tableHeaders.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-base">
              <tr>
                <td className="px-4 py-3 font-medium text-text-heading">Spotify Family 1 Bulan</td>
                <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-soft text-primary-text border border-primary-soft">Digital</span></td>
                <td className="px-4 py-3">5 / 6 Orang</td>
                <td className="px-4 py-3 w-48">
                  <div className="w-full bg-bg-subtle h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-base h-full w-[83%]"></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs text-primary-text font-semibold hover:underline">{adminData.dashboard.activeProjects.actionEdit}</button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-text-heading">Buku Cetak Kalkulus Vol. 2</td>
                <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-warning-soft text-warning-text border border-warning-subtle">Buku & Tulis</span></td>
                <td className="px-4 py-3">2 / 2 Orang</td>
                <td className="px-4 py-3">
                  <div className="w-full bg-bg-subtle h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-base h-full w-[100%]"></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs text-primary-text font-semibold hover:underline">{adminData.dashboard.activeProjects.actionEdit}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </AdminLayout>
  );
}
