import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminData } from '../../data/admin';
import PenggunaRow from '../../components/admin/PenggunaRow';
import { api } from '../../services/api';
import { toast } from 'sonner';
import PageFilter from '../../components/common/PageFilter';
import ActionModal from '../../components/common/ActionModal';

export default function Pengguna() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToRestore, setItemToRestore] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    let params = {};
    
    // Validasi frontend untuk nama/email pencarian (maksimal 100 karakter)
    if (searchQuery) {
      if (searchQuery.length > 100) {
        toast.error("Pencarian maksimal 100 karakter.");
        setLoading(false);
        return;
      }
      params.q = searchQuery;
    }
    
    if (activeTab === "active") {
      params.status = "active";
    } else if (activeTab === "deleted") {
      params.status = "deleted";
    } else {
      params.status = "all";
    }

    const res = await api.user.getAll(params);
    if (res.success && res.payload) {
      setUsers(res.payload);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, activeTab]);

  const handleDelete = async () => {
    if (!itemToDelete) return;
    const res = await api.user.delete({ id: itemToDelete.id });
    if (res.success) {
      toast.success(res.message);
      setItemToDelete(null);
      fetchUsers();
    } else {
      toast.error(res.message);
    }
  };

  const handleRestore = async () => {
    if (!itemToRestore) return;
    const res = await api.user.delete({ id: itemToRestore.id, action: 'restore' });
    if (res.success) {
      toast.success(res.message);
      setItemToRestore(null);
      fetchUsers();
    } else {
      toast.error(res.message);
    }
  };

  const filterTabs = [
    { id: "all", label: "Semua" },
    { id: "active", label: "Aktif" },
    { id: "deleted", label: "Dihapus" }
  ];

  return (
    <AdminLayout title={adminData.pengguna.title}>

      <PageFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={[]}
        setActiveCategory={() => {}}
        filters={[]}
        tabs={filterTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchPlaceholder="Cari info pengguna..."
        hideCategory={true}
      />

      {/*  TABEL PENGGUNA  */}
      <div className="bg-bg-surface rounded-2xl border border-border-base shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-subtle text-text-muted text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">{adminData.pengguna.tableHeaders.user}</th>
                <th className="px-6 py-4">{adminData.pengguna.tableHeaders.program}</th>
                <th className="px-6 py-4">Total Ulasan</th>
                <th className="px-6 py-4">{adminData.pengguna.tableHeaders.status}</th>
                <th className="px-6 py-4 text-right">{adminData.pengguna.tableHeaders.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-base">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-text-muted">Memuat data pengguna...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-text-muted">Tidak ada pengguna yang ditemukan</td>
                </tr>
              ) : (
                users.map(item => (
                  <PenggunaRow 
                    key={item.id} 
                    item={item} 
                    onDelete={() => setItemToDelete(item)}
                    onRestore={() => setItemToRestore(item)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ActionModal
        isOpen={!!itemToDelete}
        onCancel={() => setItemToDelete(null)}
        title="Hapus Pengguna"
        description="Apakah Anda yakin ingin menonaktifkan pengguna ini? Pengguna tidak akan dapat login."
        confirmText="Hapus Pengguna"
        onConfirm={handleDelete}
        type="confirm"
        icon="warning"
      />

      <ActionModal
        isOpen={!!itemToRestore}
        onCancel={() => setItemToRestore(null)}
        title="Pulihkan Pengguna"
        description="Apakah Anda yakin ingin memulihkan pengguna ini? Pengguna akan dapat login kembali."
        confirmText="Pulihkan Pengguna"
        onConfirm={handleRestore}
        type="confirm"
        icon="info"
      />

    </AdminLayout>
  );
}
