import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Komunitas() {
  return (
    <AdminLayout title="Rekomendasi & Komunitas">

      {/*  SECTION 1: REKOMENDASI TERPILIH (FEATURED ADMIN)  */}
      <section className="bg-bg-surface rounded-2xl border border-border-base shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-text-heading text-base">Rekomendasi Utama (Banner Depan)</h3>
            <p className="text-xs text-text-muted">Patungan yang di-pin untuk tampil di halaman utama customer</p>
          </div>
          <button className="px-3.5 py-2 bg-primary-base hover:bg-primary-hover text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary-ring/20">+ Pin Patungan Baru</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-primary-ring/30 bg-primary-soft flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-base text-white uppercase">Featured #1</span>
              <h4 className="font-bold text-text-heading text-sm mt-2">Spotify Family 1 Bulan</h4>
              <p className="text-xs text-text-muted mt-1">Rp 15.000 / orang • Slot 5/6</p>
            </div>
            <button className="mt-4 text-xs font-semibold text-danger-base hover:underline text-left">Lepas dari Pin Header</button>
          </div>

          <div className="p-4 rounded-xl border border-border-base bg-bg-subtle flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-bg-subtle text-text-base uppercase">Featured #2</span>
              <h4 className="font-bold text-text-heading text-sm mt-2">Patungan Printer Bersama Kos</h4>
              <p className="text-xs text-text-muted mt-1">Rp 75.000 / orang • Slot 3/4</p>
            </div>
            <button className="mt-4 text-xs font-semibold text-danger-base hover:underline text-left">Lepas dari Pin Header</button>
          </div>
        </div>
      </section>

      {/*  SECTION 2: GRUP DISKUSI KOMUNITAS  */}
      <section className="bg-bg-surface rounded-2xl border border-border-base shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-text-heading text-base">Grup Diskusi & Komunitas Kampus</h3>
            <p className="text-xs text-text-muted">Grup yang dibentuk pengguna untuk berkoordinasi</p>
          </div>
          <button className="px-3.5 py-2 bg-primary-base hover:bg-primary-hover text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary-ring/20">+ Buat Grup Baru</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border-base flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary-text font-bold flex items-center justify-center text-lg"><i className="ph ph-books"></i></div>
              <div>
                <h4 className="font-bold text-text-heading text-xs">Anak Lab Informatika UNS</h4>
                <p className="text-[11px] text-text-muted">128 Anggota • 12 Patungan Sukses</p>
              </div>
            </div>
            <button className="text-xs text-primary-base font-semibold hover:underline">Kelola Grup</button>
          </div>

          <div className="p-4 rounded-xl border border-border-base flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning-soft text-warning-text font-bold flex items-center justify-center text-lg"><i className="ph ph-house-line"></i></div>
              <div>
                <h4 className="font-bold text-text-heading text-xs">Komunitas Kos sekitar Jebres</h4>
                <p className="text-[11px] text-text-muted">84 Anggota • 8 Patungan Sukses</p>
              </div>
            </div>
            <button className="text-xs text-primary-base font-semibold hover:underline">Kelola Grup</button>
          </div>
        </div>
      </section>

    </AdminLayout>
  );
}
