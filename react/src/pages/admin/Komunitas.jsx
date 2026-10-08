import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Komunitas() {
  return (
    <AdminLayout title="Rekomendasi & Komunitas">

      {/*  SECTION 1: REKOMENDASI TERPILIH (FEATURED ADMIN)  */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Rekomendasi Utama (Banner Depan)</h3>
            <p className="text-xs text-slate-400">Patungan yang di-pin untuk tampil di halaman utama customer</p>
          </div>
          <button className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20">+ Pin Patungan Baru</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase">Featured #1</span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-2">Spotify Family 1 Bulan</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Rp 15.000 / orang • Slot 5/6</p>
            </div>
            <button className="mt-4 text-xs font-semibold text-rose-600 hover:underline text-left">Lepas dari Pin Header</button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 uppercase">Featured #2</span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-2">Patungan Printer Bersama Kos</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Rp 75.000 / orang • Slot 3/4</p>
            </div>
            <button className="mt-4 text-xs font-semibold text-rose-600 hover:underline text-left">Lepas dari Pin Header</button>
          </div>
        </div>
      </section>

      {/*  SECTION 2: GRUP DISKUSI KOMUNITAS  */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Grup Diskusi & Komunitas Kampus</h3>
            <p className="text-xs text-slate-400">Grup yang dibentuk pengguna untuk berkoordinasi</p>
          </div>
          <button className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20">+ Buat Grup Baru</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-lg"><i className="ph ph-books"></i></div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Anak Lab Informatika UNS</h4>
                <p className="text-[11px] text-slate-400">128 Anggota • 12 Patungan Sukses</p>
              </div>
            </div>
            <button className="text-xs text-indigo-600 font-semibold hover:underline">Kelola Grup</button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-lg"><i className="ph ph-house-line"></i></div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Komunitas Kos sekitar Jebres</h4>
                <p className="text-[11px] text-slate-400">84 Anggota • 8 Patungan Sukses</p>
              </div>
            </div>
            <button className="text-xs text-indigo-600 font-semibold hover:underline">Kelola Grup</button>
          </div>
        </div>
      </section>

    </AdminLayout>
  );
}
