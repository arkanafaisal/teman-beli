import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminData } from '../../data/admin';
import PatunganRow from '../../components/admin/PatunganRow';
import { api } from '../../services/api';
import { toast } from 'sonner';
import PageFilter from '../../components/common/PageFilter';
import { patunganData } from '../../data/patungan';
import ActionModal from '../../components/common/ActionModal';

export default function Patungan() {
  const [patungans, setPatungans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const [itemToCancel, setItemToCancel] = useState(null);

  const fetchPatungans = async () => {
    setLoading(true);
    let params = {};
    if (searchQuery) params.q = searchQuery;
    if (activeCategories.length > 0) params.category = activeCategories.join(",");
    
    // Status filter
    if (activeTab === "active") params.status = "OPEN";
    else if (activeTab === "completed") params.status = "FINISHED,FULL,CANCELLED";
    else if (activeTab === "all") params.status = "OPEN,FINISHED,FULL,CANCELLED";

    const res = await api.patungan.getAll(params);
    if (res.success) {
      setPatungans(res.payload);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPatungans();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, activeCategories, activeTab]);

  const handleCancel = async () => {
    if (!itemToCancel) return;
    const res = await api.patungan.updateStatus({ id: itemToCancel.id, status: 'CANCELLED' });
    if (res.success) {
      toast.success(res.message || "Patungan berhasil dibatalkan");
      fetchPatungans();
    } else {
      toast.error(res.message);
    }
    setItemToCancel(null);
  };

  const triggerCancelModal = (item) => {
    setItemToCancel(item);
  };

  const filterTabs = [
    { id: "all", label: adminData.patungan.filters.all },
    { id: "active", label: adminData.patungan.filters.active },
    { id: "completed", label: adminData.patungan.filters.completed }
  ];

  return (
    <AdminLayout title={adminData.patungan.title}>



      <PageFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategories}
        setActiveCategory={setActiveCategories}
        filters={patunganData.feed.filters}
        searchPlaceholder={patunganData.feed.search.placeholder}
        tabs={filterTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/*  TABEL PATUNGAN  */}
      <div className="bg-bg-surface rounded-2xl border border-border-base shadow-sm overflow-hidden mt-6">
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
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-text-muted">Memuat data...</td>
                </tr>
              ) : patungans.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-text-muted">Belum ada patungan.</td>
                </tr>
              ) : (
                patungans.map((item) => (
                  <PatunganRow key={item.id} item={item} onCancel={() => triggerCancelModal(item)} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      <ActionModal 
        isOpen={!!itemToCancel}
        type="confirm"
        title="Konfirmasi Pembatalan"
        description={`Apakah Anda yakin ingin membatalkan patungan "${itemToCancel?.title}"? Patungan yang dibatalkan tidak bisa dikembalikan seperti semula.`}
        confirmText="Ya, Batalkan"
        cancelText="Tidak"
        icon="warning"
        onConfirm={handleCancel}
        onCancel={() => setItemToCancel(null)}
      />

    </AdminLayout>
  );
}
