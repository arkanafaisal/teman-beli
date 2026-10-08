import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Komunitas() {
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isStatusConfirmModalOpen, setIsStatusConfirmModalOpen] = useState(false);
  const [statusConfirmData, setStatusConfirmData] = useState({
    title: '',
    isActive: true,
    badgeId: '',
  });

  const confirmToggleStatus = (title, isActive, badgeId) => {
    setStatusConfirmData({ title, isActive, badgeId });
    setIsStatusConfirmModalOpen(true);
  };

  const closeStatusConfirmModal = () => {
    setIsStatusConfirmModalOpen(false);
  };

  const executeStatusToggle = () => {
    // Di sini logika state perubahan aslinya nanti
    console.log("Status changed for", statusConfirmData.title);
    closeStatusConfirmModal();
  };

  return (
    <AdminLayout title="Kelola Komunitas & Rekomendasi">
      {/* KONTEN UTAMA */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-3.5 py-1.5 bg-primary-base text-text-inverted rounded-xl text-xs font-semibold">Semua (18)</button>
          <button className="px-3.5 py-1.5 bg-bg-surface border border-border-base text-text-base hover:bg-bg-subtle rounded-xl text-xs font-medium">Aktif (15)</button>
          <button className="px-3.5 py-1.5 bg-bg-surface border border-border-base text-text-base hover:bg-bg-subtle rounded-xl text-xs font-medium">Nonaktif (3)</button>
        </div>

        <button onClick={() => setIsCommunityModalOpen(true)} className="px-4 py-2.5 bg-primary-base hover:bg-primary-hover text-text-inverted rounded-xl text-xs font-semibold shadow-lg shadow-primary-base/20 transition flex items-center justify-center gap-2">
          <i className="ph ph-plus-circle text-base"></i> Buat Info Komunitas Baru
        </button>
      </div>

      {/* TABEL KOMUNITAS */}
      <div className="bg-bg-surface rounded-2xl border border-border-base shadow-sm overflow-hidden">
        <div className="w-full">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-bg-subtle text-text-muted text-[11px] sm:text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 sm:px-6 py-4">Judul Info / Postingan</th>
                <th className="px-3 sm:px-4 py-4">Kategori</th>
                <th className="px-3 sm:px-4 py-4">Lokasi</th>
                <th className="px-3 sm:px-4 py-4">Penulis</th>
                <th className="px-3 sm:px-4 py-4">Interaksi</th>
                <th className="px-3 sm:px-4 py-4">Status</th>
                <th className="px-3 sm:px-4 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-base">
              
              {/* ROW 1 */}
              <tr className="hover:bg-bg-subtle transition">
                <td className="px-4 sm:px-6 py-4">
                  <p className="font-bold text-text-heading line-clamp-1">Sewa Kamera Murah buat Tugas - Mock 10</p>
                  <p className="text-[10px] sm:text-[11px] text-text-muted">ID: c-10293847</p>
                </td>
                <td className="px-3 sm:px-4 py-4">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-primary-soft text-primary-text border border-primary-ring/30 whitespace-nowrap">Kebutuhan Kampus</span>
                </td>
                <td className="px-3 sm:px-4 py-4 font-medium text-text-base">
                  <span className="inline-flex items-center gap-1"><i className="ph ph-map-pin text-text-muted"></i> Jalan Margonda</span>
                </td>
                <td className="px-3 sm:px-4 py-4 font-medium text-text-heading whitespace-nowrap">
                  Testing Lima
                </td>
                <td className="px-3 sm:px-4 py-4 text-xs text-text-muted whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 mr-2"><i className="ph ph-heart text-danger-base"></i> 3</span>
                  <span className="inline-flex items-center gap-1"><i className="ph ph-chat-teardrop-dots text-primary-base"></i> 0</span>
                </td>
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-success-soft text-success-text border border-success-base/30">Aktif</span>
                </td>
                <td className="px-3 sm:px-4 py-4 text-center whitespace-nowrap">
                  <button onClick={() => confirmToggleStatus('Sewa Kamera Murah buat Tugas - Mock 10', true, 'status-badge-1')} className="p-1.5 sm:p-2 rounded-lg text-text-base hover:text-primary-text hover:bg-bg-subtle transition" title="Sembunyikan / Nonaktifkan">
                    <i className="ph ph-eye text-lg sm:text-xl"></i>
                  </button>
                </td>
              </tr>

              {/* ROW 2 (NONAKTIF) */}
              <tr className="hover:bg-bg-subtle transition opacity-75">
                <td className="px-4 sm:px-6 py-4">
                  <p className="font-bold text-text-heading line-clamp-1">Buku Bekas Jurusan Teknik Harga Miring - Mock 8</p>
                  <p className="text-[10px] sm:text-[11px] text-text-muted">ID: c-10293849</p>
                </td>
                <td className="px-3 sm:px-4 py-4">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-warning-soft text-warning-text border border-warning-base/30 whitespace-nowrap">Buku & Catatan</span>
                </td>
                <td className="px-3 sm:px-4 py-4 font-medium text-text-base">
                  <span className="inline-flex items-center gap-1"><i className="ph ph-map-pin text-text-muted"></i> Pondok Cina</span>
                </td>
                <td className="px-3 sm:px-4 py-4 font-medium text-text-heading whitespace-nowrap">
                  Testing Lima
                </td>
                <td className="px-3 sm:px-4 py-4 text-xs text-text-muted whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 mr-2"><i className="ph ph-heart text-danger-base"></i> 2</span>
                  <span className="inline-flex items-center gap-1"><i className="ph ph-chat-teardrop-dots text-primary-base"></i> 0</span>
                </td>
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-bg-subtle text-text-muted border border-border-base">Nonaktif</span>
                </td>
                <td className="px-3 sm:px-4 py-4 text-center whitespace-nowrap">
                  <button onClick={() => confirmToggleStatus('Buku Bekas Jurusan Teknik Harga Miring - Mock 8', false, 'status-badge-3')} className="p-1.5 sm:p-2 rounded-lg text-text-muted hover:text-primary-text hover:bg-bg-subtle transition" title="Tampilkan / Aktifkan Kembali">
                    <i className="ph ph-eye-slash text-lg sm:text-xl"></i>
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM TAMBAH INFO KOMUNITAS */}
      {isCommunityModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-surface w-full max-w-lg rounded-2xl border border-border-base p-6 space-y-5 shadow-xl max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-bold text-text-heading text-base">Buat Info Komunitas Baru</h3>
              <button onClick={() => setIsCommunityModalOpen(false)} className="text-text-muted hover:text-text-heading"><i className="ph ph-x text-xl"></i></button>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsCommunityModalOpen(false); }}>
              <div>
                <label className="text-xs font-semibold text-text-base block mb-1">Judul Postingan / Info</label>
                <input type="text" placeholder="Contoh: Info Tempat Makan Murah Nasi Sambal Belut" className="w-full px-3.5 py-2 bg-bg-subtle border border-border-base rounded-xl text-xs focus:ring-2 focus:ring-primary-base focus:outline-none" required />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-text-base block mb-1">Kategori</label>
                  <select className="w-full px-3.5 py-2 bg-bg-subtle border border-border-base rounded-xl text-xs focus:ring-2 focus:ring-primary-base focus:outline-none">
                    <option value="Tempat Makan">Tempat Makan</option>
                    <option value="Kebutuhan Kampus">Kebutuhan Kampus</option>
                    <option value="Kos & Fasilitas">Kos & Fasilitas</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-base block mb-1">Lokasi</label>
                  <input type="text" placeholder="Contoh: Jalan Margonda Raya" className="w-full px-3.5 py-2 bg-bg-subtle border border-border-base rounded-xl text-xs focus:ring-2 focus:ring-primary-base focus:outline-none" required />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-text-base block mb-1">Deskripsi Lengkap</label>
                <textarea rows="3" placeholder="Jelaskan detail rekomendasi, harga promo, atau kontak terkait..." className="w-full px-3.5 py-2 bg-bg-subtle border border-border-base rounded-xl text-xs focus:ring-2 focus:ring-primary-base focus:outline-none" required></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsCommunityModalOpen(false)} className="px-4 py-2 rounded-xl border border-border-base text-xs font-semibold text-text-base hover:bg-bg-subtle">Batal</button>
                <button type="submit" className="px-4 py-2 bg-primary-base hover:bg-primary-hover text-text-inverted rounded-xl text-xs font-semibold shadow-lg shadow-primary-base/20">Publikasikan Info</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI NONAKTIFKAN / AKTIFKAN STATUS */}
      {isStatusConfirmModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-surface w-full max-w-md rounded-2xl border border-border-base p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-warning-text">
              <div className="p-2.5 bg-warning-soft rounded-xl">
                <i className="ph ph-warning-circle text-2xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-text-heading text-base">Konfirmasi Perubahan Status</h3>
                <p className="text-xs text-text-muted">Verifikasi tindakan admin</p>
              </div>
            </div>

            <p className="text-xs text-text-base leading-relaxed">
              Apakah Baginda Ratu yakin ingin <strong className="text-text-heading">{statusConfirmData.isActive ? "menonaktifkan (menyembunyikan)" : "mengaktifkan kembali"}</strong> postingan info "<strong className="text-text-heading">{statusConfirmData.title}</strong>"?
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={closeStatusConfirmModal} className="px-4 py-2 rounded-xl border border-border-base text-xs font-semibold text-text-base hover:bg-bg-subtle">Batal</button>
              <button type="button" onClick={executeStatusToggle} className="px-4 py-2 bg-primary-base hover:bg-primary-hover text-text-inverted rounded-xl text-xs font-semibold shadow-lg shadow-primary-base/20">Ya, Ubah Status</button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
