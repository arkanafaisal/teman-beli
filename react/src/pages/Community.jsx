import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { communityData } from "../data/community";
import { toast } from "sonner";
import { getCategoryStyles } from "../utils/iconMapper";
import PageHeader from "../components/common/PageHeader";
import PageFilter from "../components/common/PageFilter";
import CommunityCard from "../components/community/CommunityCard";
import CommunityDetailModal from "../components/community/CommunityDetailModal";
import CenterModalWrapper from "../components/common/CenterModalWrapper";
import CommunityForm from "../components/community/CommunityForm";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function Community() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCommunities = async () => {
    setIsLoading(true);
    let params = {};
    if (searchQuery) params.q = searchQuery;
    if (activeCategories.length > 0) params.category = activeCategories.join(",");

    const res = await api.community.getAll(params);
    if (res.success && res.payload) {
      const mappedData = res.payload.map(item => {
        const filterInfo = communityData.filters.find(f => f.value === item.kategoriKey) || {};
        const styles = getCategoryStyles(item.kategoriKey);

        return {
          ...item,
          kategoriLabel: filterInfo.label || item.kategoriKey,
          icon: filterInfo.icon || "📌",
          badgeBg: styles.badgeBg,
          avatarBg: styles.avatarBg,
          avatarLetter: item.author ? item.author.charAt(0).toUpperCase() : "A",
        };
      });
      setItems(mappedData);
    }
    setIsLoading(false);
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
  }, [items]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCommunities();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, activeCategories]);



  const handleOpenModal = (item) => {
    setActiveItem(item);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setActiveItem(null);
    document.body.style.overflow = "auto";
    setCommentText("");
  };

  const handleLike = async (id) => {
    if (!user?.isLoggedIn) {
      toast.error(communityData.alerts.loginRequired);
      return;
    }

    // Optimistic UI update
    const updateItemLikeState = (item) => {
      if (item.isLiked) {
        return { ...item, likes: item.likes - 1, isLiked: false };
      } else {
        return { ...item, likes: item.likes + 1, isLiked: true };
      }
    };

    const newItems = items.map(item => item.id === id ? updateItemLikeState(item) : item);
    setItems(newItems);

    if (activeItem && activeItem.id === id) {
      setActiveItem(updateItemLikeState(activeItem));
    }

    // API call
    const res = await api.community.toggleLike(id);
    if (!res.success) {
      // Revert if failed
      fetchCommunities();
    }
  };

  const handleAddComment = async (id) => {
    if (!user?.isLoggedIn) {
      toast.error(communityData.alerts.loginRequired);
      return;
    }

    if (!commentText.trim()) return;

    const res = await api.community.addComment(id, { text: commentText });
    if (res.success) {
      const newComment = {
        author: user.name,
        text: commentText,
        date: new Date().toISOString()
      };

      const newItems = items.map(item => {
        if (item.id === id) {
          return { ...item, comments: [newComment, ...item.comments] };
        }
        return item;
      });

      setItems(newItems);
      if (activeItem && activeItem.id === id) {
        setActiveItem({ ...activeItem, comments: [newComment, ...activeItem.comments] });
      }
      setCommentText("");
      
      // Optionally fetch again to ensure consistency
      fetchCommunities();
    }
  };

  return (
    <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 w-full">
      <PageHeader
        title={communityData.header.title}
        subtitle={communityData.header.subtitle}
        buttonText={communityData.header.shareButton}
        onButtonClick={() => {
          if (!user?.isLoggedIn) {
            toast.error(communityData.alerts.loginRequired);
          } else {
            setIsCreateModalOpen(true);
          }
        }}
      />
      <PageFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tabs={communityData.filters.filter(f => f.value !== 'all').map(f => ({ id: f.value, label: f.label }))}
        activeTab={activeCategories}
        setActiveTab={setActiveCategories}
        searchPlaceholder={communityData.search.placeholder}
      />

      {items.length === 0 && !isLoading ? (
        <div className="py-16 text-center" data-aos="fade-up">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-text-heading mb-2">Informasi tidak ditemukan</h3>
          <p className="text-sm text-text-muted">Coba ubah kata kunci atau kategori filter Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="info-cards-grid">
          {items.map((item, index) => (
            <CommunityCard
              key={item.id}
              item={item}
              onClick={handleOpenModal}
              index={index}
            />
          ))}
        </div>
      )}

      <CommunityDetailModal
        item={activeItem}
        onClose={handleCloseModal}
        onLike={handleLike}
        onAddComment={handleAddComment}
        commentText={commentText}
        setCommentText={setCommentText}
      />

      {isCreateModalOpen && (
        <CenterModalWrapper title={communityData.form.modalTitle} onClose={() => setIsCreateModalOpen(false)}>
          <CommunityForm onSuccess={() => {
            setIsCreateModalOpen(false);
            fetchCommunities(); // Refresh list after create
          }} />
        </CenterModalWrapper>
      )}
    </main>
  );
}
