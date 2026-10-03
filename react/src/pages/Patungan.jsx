import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { patunganFeedData } from "../data/patunganFeed";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/common/PageHeader";
import PageFilter from "../components/common/PageFilter";
import PatunganCard from "../components/patungan/PatunganCard";
import PatunganDetailModal from "../components/patungan/PatunganDetailModal";
import CenterModalWrapper from "../components/common/CenterModalWrapper";
import PatunganForm from "../components/patungan/PatunganForm";

export default function Patungan() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreate = () => {
    if (!user?.isLoggedIn) {
      alert(patunganFeedData.alerts.loginRequired);
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

  useEffect(() => {
    AOS.refresh();
  }, [searchQuery, activeCategory]);

  const filteredItems = patunganFeedData.mockData.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <PageHeader 
        title={patunganFeedData.header.title}
        subtitle={patunganFeedData.header.subtitle}
        buttonText={patunganFeedData.header.createButton}
        onButtonClick={handleCreate}
      />
      <PageFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        filters={patunganFeedData.filters}
        searchPlaceholder={patunganFeedData.search.placeholder}
      />
      
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center" data-aos="fade-up">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-text-heading mb-2">{patunganFeedData.emptyState.message}</h3>
          <p className="text-sm text-text-muted">{patunganFeedData.emptyState.subMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
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
        <CenterModalWrapper title="Buat Patungan Baru" onClose={() => setIsCreateModalOpen(false)}>
          <PatunganForm onSuccess={() => setIsCreateModalOpen(false)} />
        </CenterModalWrapper>
      )}
    </main>
  );
}
