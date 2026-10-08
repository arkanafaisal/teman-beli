import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Patungan() {
  return (
    <AdminLayout title="Kelola Project Patungan">

      {/*  CONTROLS & FILTER  */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold">Semua (32)</button>
          <button className="px-3.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-xl text-xs font-medium">Berjalan (24)</button>
          <button className="px-3.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-xl text-xs font-medium">Selesai/Penuh (8)</button>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2">
          <i className="ph ph-plus-circle text-base"></i> Buat Patungan Baru
        </button>
      </div>

      {/*  TABEL PATUNGAN  */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Nama Project Patungan</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Harga / Orang</th>
                <th className="px-6 py-4">Progres Slot</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 dark:text-white">Spotify Family Plan (1 Bulan)</p>
                  <p className="text-[11px] text-slate-400">Penggagas: @aditya_p</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">Digital</span>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Rp 15.000</td>
                <td className="px-6 py-4 w-48">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-600 dark:text-slate-400">5/6 Slot</span>
                    <span className="font-bold text-blue-600">83%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[83%]"></div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">Berjalan</span></td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition"><i className="ph ph-pencil text-lg"></i></button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 transition"><i className="ph ph-trash text-lg"></i></button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 dark:text-white">Buku Cetak Kalkulus Vol. 2 (Fotokopi)</p>
                  <p className="text-[11px] text-slate-400">Penggagas: Admin</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Buku & Tulis</span>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Rp 35.000</td>
                <td className="px-6 py-4 w-48">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-600 dark:text-slate-400">2/2 Slot</span>
                    <span className="font-bold text-blue-600">100%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[100%]"></div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">Penuh / Selesai</span></td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition"><i className="ph ph-pencil text-lg"></i></button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 transition"><i className="ph ph-trash text-lg"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>



      {/* MODAL RECOVERED FROM VANILLA */}
      <div id="patunganModal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Buat Project Patungan Baru</h3>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><i className="ph ph-x text-xl"></i></button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Judul Patungan</label>
              <input type="text" placeholder="Contoh: Netflix Premium 4K (4 Screen)" className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Kategori</label>
                <select className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Digital & Subscription</option>
                  <option>Buku & Cetak Akademik</option>
                  <option>Kebutuhan Kos</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Target Kuota Slot</label>
                <input type="number" placeholder="4" className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Harga Total (Rp)</label>
                <input type="number" placeholder="186000" className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Harga Per Orang (Rp)</label>
                <input type="number" placeholder="46500" className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">Batal</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20">Publikasikan Patungan</button>
            </div>
          </form>
        </div>
      </div>

    </AdminLayout>
  );
}
