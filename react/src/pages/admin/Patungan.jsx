import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminData } from '../../data/admin';

export default function Patungan() {
  return (
    <AdminLayout title={adminData.patungan.title}>

      {/*  CONTROLS & FILTER  */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-3.5 py-1.5 bg-primary-base text-white rounded-xl text-xs font-semibold">{adminData.patungan.filters.all}</button>
          <button className="px-3.5 py-1.5 bg-bg-surface border border-border-base text-text-base hover:bg-bg-subtle rounded-xl text-xs font-medium">{adminData.patungan.filters.active}</button>
          <button className="px-3.5 py-1.5 bg-bg-surface border border-border-base text-text-base hover:bg-bg-subtle rounded-xl text-xs font-medium">{adminData.patungan.filters.completed}</button>
        </div>

        <button className="px-4 py-2.5 bg-primary-base hover:bg-primary-hover text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary-ring/20 transition flex items-center justify-center gap-2">
          <i className="ph ph-plus-circle text-base"></i> {adminData.patungan.addBtn}
        </button>
      </div>

      {/*  TABEL PATUNGAN  */}
      <div className="bg-bg-surface rounded-2xl border border-border-base shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-subtle text-text-muted text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">{adminData.patungan.tableHeaders.name}</th>
                <th className="px-6 py-4">{adminData.patungan.tableHeaders.category}</th>
                <th className="px-6 py-4">{adminData.patungan.tableHeaders.price}</th>
                <th className="px-6 py-4">{adminData.patungan.tableHeaders.progress}</th>
                <th className="px-6 py-4">{adminData.patungan.tableHeaders.status}</th>
                <th className="px-6 py-4 text-right">{adminData.patungan.tableHeaders.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-base">
              <tr className="hover:bg-bg-subtle transition">
                <td className="px-6 py-4">
                  <p className="font-bold text-text-heading">Spotify Family Plan (1 Bulan)</p>
                  <p className="text-[11px] text-text-muted">Penggagas: @aditya_p</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-soft text-primary-text border border-primary-soft">Digital</span>
                </td>
                <td className="px-6 py-4 font-semibold text-text-heading">Rp 15.000</td>
                <td className="px-6 py-4 w-48">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-text-base dark:text-text-muted">5/6 Slot</span>
                    <span className="font-bold text-primary-base">83%</span>
                  </div>
                  <div className="w-full bg-bg-subtle h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-base h-full w-[83%]"></div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-soft text-primary-text border border-primary-soft">Berjalan</span></td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 text-text-muted hover:text-primary-base transition"><i className="ph ph-pencil text-lg"></i></button>
                  <button className="p-2 text-text-muted hover:text-danger-base transition"><i className="ph ph-trash text-lg"></i></button>
                </td>
              </tr>

              <tr className="hover:bg-bg-subtle transition">
                <td className="px-6 py-4">
                  <p className="font-bold text-text-heading">Buku Cetak Kalkulus Vol. 2 (Fotokopi)</p>
                  <p className="text-[11px] text-text-muted">Penggagas: Admin</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-warning-soft text-warning-text border border-warning-subtle">Buku & Tulis</span>
                </td>
                <td className="px-6 py-4 font-semibold text-text-heading">Rp 35.000</td>
                <td className="px-6 py-4 w-48">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-text-base dark:text-text-muted">2/2 Slot</span>
                    <span className="font-bold text-primary-base">100%</span>
                  </div>
                  <div className="w-full bg-bg-subtle h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-base h-full w-[100%]"></div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-bg-subtle text-text-base border border-border-hover">Penuh / Selesai</span></td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 text-text-muted hover:text-primary-base transition"><i className="ph ph-pencil text-lg"></i></button>
                  <button className="p-2 text-text-muted hover:text-danger-base transition"><i className="ph ph-trash text-lg"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>



      {/* MODAL RECOVERED FROM VANILLA */}
      <div id="patunganModal" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div className="bg-bg-surface w-full max-w-lg rounded-2xl border border-border-base p-6 space-y-5 shadow-xl">
          <div className="flex justify-between items-center border-b border-border-subtle pb-3">
            <h3 className="font-bold text-text-heading text-base">{adminData.patungan.modal.title}</h3>
            <button className="text-text-muted hover:text-text-heading"><i className="ph ph-x text-xl"></i></button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-text-base block mb-1">{adminData.patungan.modal.fields.title.label}</label>
              <input type="text" placeholder={adminData.patungan.modal.fields.title.placeholder} className="w-full px-3.5 py-2 bg-bg-subtle border border-border-hover rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-text-base block mb-1">{adminData.patungan.modal.fields.category.label}</label>
                <select className="w-full px-3.5 py-2 bg-bg-subtle border border-border-hover rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none">
                  {adminData.patungan.modal.fields.category.options.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-text-base block mb-1">{adminData.patungan.modal.fields.targetSlot.label}</label>
                <input type="number" placeholder={adminData.patungan.modal.fields.targetSlot.placeholder} className="w-full px-3.5 py-2 bg-bg-subtle border border-border-hover rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-text-base block mb-1">{adminData.patungan.modal.fields.totalPrice.label}</label>
                <input type="number" placeholder={adminData.patungan.modal.fields.totalPrice.placeholder} className="w-full px-3.5 py-2 bg-bg-subtle border border-border-hover rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-base block mb-1">{adminData.patungan.modal.fields.pricePerPerson.label}</label>
                <input type="number" placeholder={adminData.patungan.modal.fields.pricePerPerson.placeholder} className="w-full px-3.5 py-2 bg-bg-subtle border border-border-hover rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none" />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" className="px-4 py-2 rounded-xl border border-border-base text-xs font-semibold text-text-base">{adminData.patungan.modal.buttons.cancel}</button>
              <button type="submit" className="px-4 py-2 bg-primary-base hover:bg-primary-hover text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary-ring/20">{adminData.patungan.modal.buttons.submit}</button>
            </div>
          </form>
        </div>
      </div>

    </AdminLayout>
  );
}
