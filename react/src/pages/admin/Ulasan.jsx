import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Ulasan() {
  return (
    <AdminLayout title="Ulasan & Rating">

      {/*  SCORE OVERVIEW CARD  */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="text-center">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">4.8</span>
            <p className="text-xs text-amber-500 font-bold mt-1">★ ★ ★ ★ ★</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Dari 458 Ulasan</p>
          </div>
          <div className="h-12 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
          <div className="text-xs space-y-1 text-slate-500 dark:text-slate-400">
            <p><span className="font-bold text-slate-900 dark:text-white">92%</span> Pengguna puas dengan kecepatan tim patungan</p>
            <p><span className="font-bold text-slate-900 dark:text-white">98%</span> Proses pembayaran terverifikasi aman</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20">Export Laporan Ulasan</button>
      </div>

      {/*  LIST ULASAN  */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">SN</div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-xs">Siti Nurhaliza</p>
                <p className="text-[10px] text-slate-400">Patungan: Spotify Family 1 Bulan • 04 Okt 2026</p>
              </div>
            </div>
            <span className="text-amber-500 font-bold text-xs">★ ★ ★ ★ ★ (5.0)</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">"Patungan Canva Pro lancar banget, prosesnya cepat dan admin fast respon! Rekomended banget buat temen-temen mahasiswa."</p>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex justify-end gap-3 text-xs">
            <button className="text-blue-600 font-semibold hover:underline"><i className="ph ph-check mr-1"></i> Tampilkan di Homepage</button>
            <button className="text-rose-600 font-semibold hover:underline"><i className="ph ph-trash mr-1"></i> Sembunyikan</button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">BS</div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-xs">Budi Santoso</p>
                <p className="text-[10px] text-slate-400">Patungan: Buku Cetak Kalkulus Vol 2 • 03 Okt 2026</p>
              </div>
            </div>
            <span className="text-amber-500 font-bold text-xs">★ ★ ★ ★ ☆ (4.0)</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">"Bagus, buku fotokopian kalkulusnya rapi dan murah meriah untuk kantong mahasiswa."</p>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex justify-end gap-3 text-xs">
            <button className="text-blue-600 font-semibold hover:underline"><i className="ph ph-check mr-1"></i> Tampilkan di Homepage</button>
            <button className="text-rose-600 font-semibold hover:underline"><i className="ph ph-trash mr-1"></i> Sembunyikan</button>
          </div>
        </div>
      </div>

    </AdminLayout>
  );
}
