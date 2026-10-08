import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminDashboard() {
  return (
    <AdminLayout title="Panel Administrasi">

      {/*  RINGKASAN STATISTIK  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Patungan Aktif</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">32 Projek</h3>
            <span className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
              8 Kategori
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl">
            <i className="ph ph-handshake"></i>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Pengguna</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1,240</h3>
            <span className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
              +12 Mahasiswa/hari
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl">
            <i className="ph ph-users font-bold"></i>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Ulasan</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">458</h3>
            <span className="inline-flex items-center text-xs font-medium text-amber-500 mt-1">
              ★ 4.8 / 5.0 Rata-rata
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl">
            <i className="ph ph-star"></i>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Komunitas</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">14 Grup</h3>
            <span className="inline-flex items-center text-xs font-medium text-purple-600 dark:text-purple-400 mt-1">
              Aktif Diskusi
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl">
            <i className="ph ph-users-three"></i>
          </div>
        </div>
      </div>

      {/*  MANAJEMEN PATUNGAN & KATEGORI  */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">Patungan Aktif & Kategori</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Pantau progres ketersediaan slot patungan</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 transition self-start sm:self-auto">
            + Tambah Patungan Baru
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Item / Produk</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Target Slot</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Spotify Family 1 Bulan</td>
                <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">Digital</span></td>
                <td className="px-4 py-3">5 / 6 Orang</td>
                <td className="px-4 py-3 w-48">
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[83%]"></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">Edit</button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Buku Cetak Kalkulus Vol. 2</td>
                <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Buku & Tulis</span></td>
                <td className="px-4 py-3">2 / 2 Orang</td>
                <td className="px-4 py-3">
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[100%]"></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </AdminLayout>
  );
}
