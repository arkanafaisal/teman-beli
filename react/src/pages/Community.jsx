import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { communityData } from "../data/community";
import PageHeader from "../components/common/PageHeader";
import PageFilter from "../components/common/PageFilter";
import CommunityCard from "../components/community/CommunityCard";
import CommunityDetailModal from "../components/community/CommunityDetailModal";
import CenterModalWrapper from "../components/common/CenterModalWrapper";
import CommunityForm from "../components/community/CommunityForm";
import { useAuth } from "../context/AuthContext";

export default function Community() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [items, setItems] = useState(communityData.mockInfoData);
  const [activeItem, setActiveItem] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [searchQuery, activeFilter]);

  const filteredItems = items.filter(item => {
    const matchCat = activeFilter === "all" || item.kategoriKey === activeFilter;
    const matchQuery = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || item.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleOpenModal = (item) => {
    setActiveItem(item);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setActiveItem(null);
    document.body.style.overflow = "auto";
    setCommentText("");
  };

  const handleLike = (id) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        if (!item.isLiked) {
          return { ...item, likes: item.likes + 1, isLiked: true };
        } else {
          return { ...item, likes: item.likes - 1, isLiked: false };
        }
      }
      return item;
    });
    setItems(newItems);

    // Also update active item if open
    if (activeItem && activeItem.id === id) {
      if (!activeItem.isLiked) {
        setActiveItem({ ...activeItem, likes: activeItem.likes + 1, isLiked: true });
      } else {
        setActiveItem({ ...activeItem, likes: activeItem.likes - 1, isLiked: false });
      }
    }
  };

  const handleAddComment = (id) => {
    if (!commentText.trim()) return;

    const newComment = {
      author: user.isLoggedIn ? user.name : "Guest",
      text: commentText,
      date: "Baru saja"
    };

    const newItems = items.map(item => {
      if (item.id === id) {
        return { ...item, comments: [...item.comments, newComment] };
      }
      return item;
    });

    setItems(newItems);
    if (activeItem && activeItem.id === id) {
      setActiveItem({ ...activeItem, comments: [...activeItem.comments, newComment] });
    }
    setCommentText("");
  };

  return (
    <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 w-full">
      <PageHeader
        title={communityData.header.title}
        subtitle={communityData.header.subtitle}
        buttonText={communityData.header.shareButton}
        onButtonClick={() => {
          if (!user?.isLoggedIn) {
            alert(communityData.alerts.loginRequired);
          } else {
            setIsCreateModalOpen(true);
          }
        }}
      />
      <PageFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeFilter}
        setActiveCategory={setActiveFilter}
        filters={communityData.filters}
        searchPlaceholder={communityData.search.placeholder}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="info-cards-grid">
        {filteredItems.map((item, index) => (
          <CommunityCard
            key={item.id}
            item={item}
            onClick={handleOpenModal}
            index={index}
          />
        ))}
      </div>

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
          <CommunityForm onSuccess={() => setIsCreateModalOpen(false)} />
        </CenterModalWrapper>
      )}
    </main>
  );
}
