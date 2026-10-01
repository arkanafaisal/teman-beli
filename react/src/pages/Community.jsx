import { useState } from "react";
import { communityData } from "../data/community";
import CommunityHeader from "../components/community/CommunityHeader";
import CommunityFilter from "../components/community/CommunityFilter";
import CommunityCard from "../components/community/CommunityCard";
import CommunityModal from "../components/community/CommunityModal";
import { useAuth } from "../context/AuthContext";

export default function Community() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [items, setItems] = useState(communityData.mockInfoData);
  const [activeItem, setActiveItem] = useState(null);
  const [commentText, setCommentText] = useState("");

  const filteredItems = activeFilter === "all" ? items : items.filter(item => item.kategoriKey === activeFilter);

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
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    });
    setItems(newItems);
    
    // Also update active item if open
    if (activeItem && activeItem.id === id) {
      setActiveItem({ ...activeItem, likes: activeItem.likes + 1 });
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
    <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full">
      <CommunityHeader />
      <CommunityFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="info-cards-grid">
        {filteredItems.map(item => (
          <CommunityCard 
            key={item.id} 
            item={item} 
            onClick={handleOpenModal} 
          />
        ))}
      </div>

      <CommunityModal 
        item={activeItem} 
        onClose={handleCloseModal} 
        onLike={handleLike}
        onAddComment={handleAddComment}
        commentText={commentText}
        setCommentText={setCommentText}
      />
    </main>
  );
}
