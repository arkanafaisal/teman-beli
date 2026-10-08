import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Patungan() {
  return (
    <AdminLayout title="Kelola Project Patungan">

      {/*  CONTROLS & FILTER  */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-3.5 py-1.5 bg-primary-base text-white rounded-xl text-xs font-semibold">Semua (32)</button>
          <button className="px-3.5 py-1.5 bg-bg-surface border border-border-base text-text-base hover:bg-bg-subtle rounded-xl text-xs font-medium">Berjalan (24)</button>
          <button className="px-3.5 py-1.5 bg-bg-surface border border-border-base text-text-base hover:bg-bg-subtle rounded-xl text-xs font-medium">Selesai/Penuh (8)</button>
        </div>

        <button className="px-4 py-2.5 bg-primary-base hover:bg-primary-hover text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary-ring/20 transition flex items-center justify-center gap-2">
          <i className="ph ph-plus-circle text-base"></i> Buat Patungan Baru
        </button>
      </div>

      {/*  TABEL PATUNGAN  */}
      <div className="bg-bg-surface rounded-2xl border border-border-base shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-subtle text-text-muted text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Nama Project Patungan</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Harga / Orang</th>
                <th className="px-6 py-4">Progres Slot</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
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
            <h3 className="font-bold text-text-heading text-base">Buat Project Patungan Baru</h3>
            <button className="text-text-muted hover:text-text-heading"><i className="ph ph-x text-xl"></i></button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-text-base block mb-1">Judul Patungan</label>
              <input type="text" placeholder="Contoh: Netflix Premium 4K (4 Screen)" className="w-full px-3.5 py-2 bg-bg-subtle border border-border-hover rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-text-base block mb-1">Kategori</label>
                <select className="w-full px-3.5 py-2 bg-bg-subtle border border-border-hover rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none">
                  <option>Digital & Subscription</option>
                  <option>Buku & Cetak Akademik</option>
                  <option>Kebutuhan Kos</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-text-base block mb-1">Target Kuota Slot</label>
                <input type="number" placeholder="4" className="w-full px-3.5 py-2 bg-bg-subtle border border-border-hover rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-text-base block mb-1">Harga Total (Rp)</label>
                <input type="number" placeholder="186000" className="w-full px-3.5 py-2 bg-bg-subtle border border-border-hover rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-base block mb-1">Harga Per Orang (Rp)</label>
                <input type="number" placeholder="46500" className="w-full px-3.5 py-2 bg-bg-subtle border border-border-hover rounded-xl text-xs focus:ring-2 focus:ring-primary-ring focus:outline-none" />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" className="px-4 py-2 rounded-xl border border-border-base text-xs font-semibold text-text-base">Batal</button>
              <button type="submit" className="px-4 py-2 bg-primary-base hover:bg-primary-hover text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary-ring/20">Publikasikan Patungan</button>
            </div>
          </form>
        </div>
      </div>

    </AdminLayout>
  );
}
