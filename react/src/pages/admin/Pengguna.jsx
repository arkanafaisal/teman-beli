import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Pengguna() {
  return (
    <AdminLayout title="Manajemen Pengguna">

      {/*  FILTER & SEARCH  */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <i className="ph ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"></i>
          <input
            type="text"
            placeholder="Cari nama, NIM, email, atau jurusan..."
            className="w-full pl-10 pr-4 py-2 bg-bg-surface border border-border-base rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-primary-base text-white rounded-xl text-xs font-semibold">Semua (1,240)</button>
          <button className="px-3 py-1.5 bg-bg-surface border border-border-base text-text-base rounded-xl text-xs font-medium">Pending Verification (12)</button>
        </div>
      </div>

      {/*  TABEL PENGGUNA  */}
      <div className="bg-bg-surface rounded-2xl border border-border-base shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-subtle text-text-muted text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Pengguna</th>
                <th className="px-6 py-4">Program / Institusi</th>
                <th className="px-6 py-4">Total Patungan</th>
                <th className="px-6 py-4">Status KTM</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-base">
              <tr className="hover:bg-bg-subtle transition">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-bg-subtle font-bold text-text-base flex items-center justify-center text-xs">AP</div>
                  <div>
                    <p className="font-bold text-text-heading">Aditya Pratama</p>
                    <p className="text-[11px] text-text-muted">aditya@student.uns.ac.id</p>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-xs">Informatika • UNS</td>
                <td className="px-6 py-4 font-semibold">8 Ikut</td>
                <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-soft text-primary-text border border-primary-soft">Terverifikasi</span></td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-xs text-primary-text font-semibold hover:underline">Detail</button>
                  <button className="text-xs text-danger-base font-semibold hover:underline">Suspend</button>
                </td>
              </tr>
              <tr className="hover:bg-bg-subtle transition">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-bg-subtle font-bold text-text-base flex items-center justify-center text-xs">TR</div>
                  <div>
                    <p className="font-bold text-text-heading">Tazkia Ramadhani</p>
                    <p className="text-[11px] text-text-muted">tazkia@student.uns.ac.id</p>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-xs">Teknik Industri • UNS</td>
                <td className="px-6 py-4 font-semibold">5 Ikut</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-soft text-warning-text border border-warning-subtle">Menunggu Verifikasi</span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-xs text-primary-base font-semibold hover:underline">Verifikasi KTM</button>
                  <button className="text-xs text-text-muted font-semibold hover:underline">Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
}
