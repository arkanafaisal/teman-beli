import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminData } from '../../data/admin';

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
        <div className="bg-bg-surface p-5 rounded-2xl border border-border-base shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-soft text-primary-text font-bold flex items-center justify-center text-xs">SN</div>
              <div>
                <p className="font-bold text-text-heading text-xs">Siti Nurhaliza</p>
                <p className="text-[10px] text-text-muted">Patungan: Spotify Family 1 Bulan • 04 Okt 2026</p>
              </div>
            </div>
            <span className="text-warning-base font-bold text-xs">★ ★ ★ ★ ★ (5.0)</span>
          </div>
          <p className="text-xs text-text-base">"Patungan Canva Pro lancar banget, prosesnya cepat dan admin fast respon! Rekomended banget buat temen-temen mahasiswa."</p>
          <div className="pt-2 border-t border-border-subtle flex justify-end gap-3 text-xs">
            <button className="text-primary-base font-semibold hover:underline"><i className="ph ph-check mr-1"></i> {adminData.ulasan.actions.show}</button>
            <button className="text-danger-base font-semibold hover:underline"><i className="ph ph-trash mr-1"></i> {adminData.ulasan.actions.hide}</button>
          </div>
        </div>

        <div className="bg-bg-surface p-5 rounded-2xl border border-border-base shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-soft text-primary-text font-bold flex items-center justify-center text-xs">BS</div>
              <div>
                <p className="font-bold text-text-heading text-xs">Budi Santoso</p>
                <p className="text-[10px] text-text-muted">Patungan: Buku Cetak Kalkulus Vol 2 • 03 Okt 2026</p>
              </div>
            </div>
            <span className="text-warning-base font-bold text-xs">★ ★ ★ ★ ☆ (4.0)</span>
          </div>
          <p className="text-xs text-text-base">"Bagus, buku fotokopian kalkulusnya rapi dan murah meriah untuk kantong mahasiswa."</p>
          <div className="pt-2 border-t border-border-subtle flex justify-end gap-3 text-xs">
            <button className="text-primary-base font-semibold hover:underline"><i className="ph ph-check mr-1"></i> {adminData.ulasan.actions.show}</button>
            <button className="text-danger-base font-semibold hover:underline"><i className="ph ph-trash mr-1"></i> {adminData.ulasan.actions.hide}</button>
          </div>
        </div>
      </div>

    </AdminLayout>
  );
}
