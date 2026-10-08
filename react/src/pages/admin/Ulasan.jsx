import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminData } from '../../data/admin';
import UlasanCard from '../../components/admin/UlasanCard';
import { mockUlasan } from '../../data/mockUlasan';

export default function Ulasan() {
  return (
    <AdminLayout title={adminData.ulasan.title}>

      {/*  SCORE OVERVIEW CARD  */}
      <div className="bg-bg-surface p-6 rounded-2xl border border-border-base shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="text-center">
            <span className="text-4xl font-extrabold text-text-heading">4.8</span>
            <p className="text-xs text-warning-base font-bold mt-1">★ ★ ★ ★ ★</p>
            <p className="text-[11px] text-text-muted mt-0.5">{adminData.ulasan.overview.totalReviews}</p>
          </div>
          <div className="h-12 w-px bg-bg-subtle hidden sm:block"></div>
          <div className="text-xs space-y-1 text-text-muted">
            <p><span className="font-bold text-text-heading">92%</span> {adminData.ulasan.overview.stats1}</p>
            <p><span className="font-bold text-text-heading">98%</span> {adminData.ulasan.overview.stats2}</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-primary-base hover:bg-primary-hover text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary-ring/20">{adminData.ulasan.overview.exportBtn}</button>
      </div>

      {/*  LIST ULASAN  */}
      <div className="space-y-4">
        {mockUlasan.map(item => (
          <UlasanCard key={item.id} item={item} />
        ))}
      </div>

    </AdminLayout>
  );
}
