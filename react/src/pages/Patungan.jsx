import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { patunganData } from "../data/patungan";
import { toast } from "sonner";
import { SearchX } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import PageHeader from "../components/common/PageHeader";
import PageFilter from "../components/common/PageFilter";
import PatunganCard from "../components/patungan/PatunganCard";
import PatunganDetailModal from "../components/patungan/PatunganDetailModal";
import CenterModalWrapper from "../components/common/CenterModalWrapper";
import PatunganForm from "../components/patungan/PatunganForm";

export default function Patungan() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const patunganId = params.get('id');
    return patunganId ? { id: patunganId } : null;
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const url = new URL(window.location);
    if (selectedItem?.id) {
      url.searchParams.set('id', selectedItem.id);
    } else {
      url.searchParams.delete('id');
    }
    window.history.replaceState({}, '', url);
  }, [selectedItem]);

  const handleCreate = () => {
    if (!user?.isLoggedIn) {
      toast.error(patunganData.feed.alerts.loginRequired);
    } else {
      setIsCreateModalOpen(true);
    }
  };

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-in-out",
    });
  }, []);

  const fetchPatungans = async () => {
    let params = {};
    if (searchQuery) params.q = searchQuery;
    if (activeCategories.length > 0) params.category = activeCategories.join(",");
    if (activeTab === "mine" && user?.isLoggedIn) params.hostId = user.id;

    const res = await api.patungan.getAll(params);
    if (res.success && res.payload) {
      const mappedData = res.payload.map(item => ({
        ...item,
        unitPrice: Math.round(item.totalPrice / item.targetQuota),
        creatorName: item.host.name,
        creatorCampus: item.host.department || "Universitas Terdaftar",
        creatorRating: item.host.rating || 0,
        creatorReviewCount: item.host.reviewCount || 0,
        isVerified: true,
        replies: []
      }));
      setItems(mappedData);
    }
  };

  useEffect(() => {
    AOS.refresh();
  }, [items]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPatungans();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, activeCategories, activeTab, user?.id]);

  const handleTabChange = (tabId) => {
    if (tabId === "mine" && !user?.isLoggedIn) {
      toast.error(patunganData.feed.alerts.loginRequired);
      return;
    }
    setActiveTab(tabId);
  };

  const filterTabs = [
    { id: "all", label: "Semua" },
    { id: "mine", label: "Patungan Saya" }
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <PageHeader 
        title={patunganData.feed.header.title}
        subtitle={patunganData.feed.header.subtitle}
        buttonText={patunganData.feed.header.createButton}
        onButtonClick={handleCreate}
      />
      <PageFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategories}
        setActiveCategory={setActiveCategories}
        filters={patunganData.feed.filters}
        searchPlaceholder={patunganData.feed.search.placeholder}
        tabs={filterTabs}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
      
      {items.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center">
          <div className="mb-4 text-text-muted"><SearchX size={56} strokeWidth={1.5} /></div>
          <h3 className="text-lg font-bold text-text-heading mb-2">{patunganData.feed.emptyState.message}</h3>
          <p className="text-sm text-text-muted">{patunganData.feed.emptyState.subMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={item.id}>
              <PatunganCard item={item} onClick={setSelectedItem} index={index} />
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <PatunganDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
      {isCreateModalOpen && (
        <CenterModalWrapper title={patunganData.form.modalTitle} onClose={() => setIsCreateModalOpen(false)}>
          <PatunganForm onSuccess={() => {
            setIsCreateModalOpen(false);
            fetchPatungans(); // Refresh list after create
          }} />
        </CenterModalWrapper>
      )}
    </main>
  );
}
