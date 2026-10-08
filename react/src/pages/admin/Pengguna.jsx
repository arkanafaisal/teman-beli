import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Pengguna() {
  return (
    <AdminLayout title="Manajemen Pengguna">

      {/*  FILTER & SEARCH  */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <i className="ph ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder="Cari nama, NIM, email, atau jurusan..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold">Semua (1,240)</button>
          <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-medium">Pending Verification (12)</button>
        </div>
      </div>

      {/*  TABEL PENGGUNA  */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Pengguna</th>
                <th className="px-6 py-4">Program / Institusi</th>
                <th className="px-6 py-4">Total Patungan</th>
                <th className="px-6 py-4">Status KTM</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs">AP</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Aditya Pratama</p>
                    <p className="text-[11px] text-slate-400">aditya@student.uns.ac.id</p>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-xs">Informatika • UNS</td>
                <td className="px-6 py-4 font-semibold">8 Ikut</td>
                <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">Terverifikasi</span></td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Detail</button>
                  <button className="text-xs text-rose-600 font-semibold hover:underline">Suspend</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs">TR</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Tazkia Ramadhani</p>
                    <p className="text-[11px] text-slate-400">tazkia@student.uns.ac.id</p>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-xs">Teknik Industri • UNS</td>
                <td className="px-6 py-4 font-semibold">5 Ikut</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Menunggu Verifikasi</span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-xs text-blue-600 font-semibold hover:underline">Verifikasi KTM</button>
                  <button className="text-xs text-slate-400 font-semibold hover:underline">Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
}
