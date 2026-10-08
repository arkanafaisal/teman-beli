import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminData } from '../../data/admin';
import PenggunaRow from '../../components/admin/PenggunaRow';
import { mockPengguna } from '../../data/mockPengguna';

export default function Pengguna() {
  return (
    <AdminLayout title={adminData.pengguna.title}>

      {/*  FILTER & SEARCH  */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <i className="ph ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"></i>
          <input
            type="text"
            placeholder={adminData.pengguna.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 bg-bg-surface border border-border-base rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-primary-base text-white rounded-xl text-xs font-semibold">{adminData.pengguna.filters.all}</button>
          <button className="px-3 py-1.5 bg-bg-surface border border-border-base text-text-base rounded-xl text-xs font-medium">{adminData.pengguna.filters.pending}</button>
        </div>
      </div>

      {/*  TABEL PENGGUNA  */}
      <div className="bg-bg-surface rounded-2xl border border-border-base shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-subtle text-text-muted text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">{adminData.pengguna.tableHeaders.user}</th>
                <th className="px-6 py-4">{adminData.pengguna.tableHeaders.program}</th>
                <th className="px-6 py-4">{adminData.pengguna.tableHeaders.totalPatungan}</th>
                <th className="px-6 py-4">{adminData.pengguna.tableHeaders.status}</th>
                <th className="px-6 py-4 text-right">{adminData.pengguna.tableHeaders.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-base">
              {mockPengguna.map(item => (
                <PenggunaRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
}
