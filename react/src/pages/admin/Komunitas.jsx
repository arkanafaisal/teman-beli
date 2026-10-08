import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminData } from '../../data/admin';
import KomunitasRow from '../../components/admin/KomunitasRow';
import { api } from '../../services/api';
import { toast } from 'sonner';
import PageFilter from '../../components/common/PageFilter';
import ActionModal from '../../components/common/ActionModal';

export default function Komunitas() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const [itemToCancel, setItemToCancel] = useState(null);
  const [itemToRestore, setItemToRestore] = useState(null);

  const fetchCommunities = async () => {
    setLoading(true);
    let params = {};
    if (searchQuery) params.q = searchQuery;
    if (activeCategories.length > 0) params.category = activeCategories.join(',');
    
    // activeTab map ke status API
    if (activeTab === "active") {
      params.status = "active";
    } else if (activeTab === "inactive") {
      params.status = "inactive";
    } else {
      params.status = "all";
    }

    const res = await api.community.getAll(params);
    if (res.success) {
      setCommunities(res.payload);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCommunities();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, activeCategories, activeTab]);

  const handleCancel = async () => {
    if (!itemToCancel) return;
    const res = await api.community.delete({ id: itemToCancel.id });
    if (res.success) {
      toast.success("Komunitas berhasil dinonaktifkan");
      fetchCommunities();
    } else {
      toast.error(res.message);
    }
    setItemToCancel(null);
  };

  const handleRestore = async () => {
    if (!itemToRestore) return;
    const res = await api.community.delete({ id: itemToRestore.id, action: 'restore' });
    if (res.success) {
      toast.success("Komunitas berhasil dipulihkan menjadi aktif");
      fetchCommunities();
    } else {
      toast.error(res.message);
    }
    setItemToRestore(null);
  };

  const triggerCancelModal = (item) => {
    setItemToCancel(item);
  };

  const triggerRestoreModal = (item) => {
    setItemToRestore(item);
  };

  const data = adminData.komunitas;

  const filterTabs = [
    { id: "all", label: data.filters.all },
    { id: "active", label: data.filters.active },
    { id: "inactive", label: data.filters.inactive }
  ];

  const categoryOptions = [
    { value: "MAKAN", label: "Makan & Minum" },
    { value: "KAMPUS", label: "Kebutuhan Kampus" },
    { value: "KOS", label: "Kebutuhan Kos" }
  ];

  return (
    <AdminLayout title={data.title}>
      {/* FILTER & PENCARIAN */}
      <div className="mb-6">
        <PageFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategories}
          setActiveCategory={setActiveCategories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={filterTabs}
          filters={categoryOptions}
          searchPlaceholder="Cari info komunitas..."
        />
      </div>

      {/* TABEL KOMUNITAS */}
      <div className="bg-bg-surface rounded-2xl border border-border-base shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-bg-subtle text-text-muted text-[11px] sm:text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 sm:px-6 py-4">{data.tableHeaders.title}</th>
                <th className="px-3 sm:px-4 py-4">{data.tableHeaders.category}</th>
                <th className="px-3 sm:px-4 py-4">{data.tableHeaders.location}</th>
                <th className="px-3 sm:px-4 py-4">{data.tableHeaders.author}</th>
                <th className="px-3 sm:px-4 py-4">{data.tableHeaders.interaction}</th>
                <th className="px-3 sm:px-4 py-4">{data.tableHeaders.status}</th>
                <th className="px-3 sm:px-4 py-4 text-center">{data.tableHeaders.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-base">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-text-muted">Memuat data...</td>
                </tr>
              ) : communities.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-text-muted">Belum ada komunitas.</td>
                </tr>
              ) : (
                communities.map((item) => (
                  <KomunitasRow 
                    key={item.id} 
                    item={item} 
                    onCancel={() => triggerCancelModal(item)} 
                    onRestore={() => triggerRestoreModal(item)} 
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL KONFIRMASI */}
      <ActionModal 
        isOpen={!!itemToCancel}
        type="confirm"
        title="Konfirmasi Penonaktifan"
        description={`Apakah Anda yakin ingin menonaktifkan info komunitas "${itemToCancel?.judul}"?`}
        confirmText="Ya, Nonaktifkan"
        cancelText="Batal"
        icon="warning"
        onConfirm={handleCancel}
        onCancel={() => setItemToCancel(null)}
      />

      <ActionModal 
        isOpen={!!itemToRestore}
        type="confirm"
        title="Konfirmasi Pemulihan"
        description={`Apakah Anda yakin ingin mengaktifkan kembali info komunitas "${itemToRestore?.judul}"?`}
        confirmText="Ya, Pulihkan"
        cancelText="Batal"
        icon="info"
        onConfirm={handleRestore}
        onCancel={() => setItemToRestore(null)}
      />

    </AdminLayout>
  );
}
