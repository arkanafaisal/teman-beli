import { useState, useEffect } from "react";
import { detailData } from "../data/detail";
import { exploreData } from "../data/explore";
import DetailHeader from "../components/detail/DetailHeader";
import DetailInfo from "../components/detail/DetailInfo";
import DetailReplies from "../components/detail/DetailReplies";
import { useAuth } from "../context/AuthContext";

export default function Detail() {
  const [item, setItem] = useState(null);
  const { user, login } = useAuth();

  useEffect(() => {
    // Determine the patungan ID from the URL path or query string
    const pathParts = window.location.pathname.split('/');
    let id = pathParts[pathParts.length - 1];
    
    if (id === "detail" || id === "detail.html") {
        const urlParams = new URLSearchParams(window.location.search);
        id = urlParams.get('id');
    }
    
    // For demo purposes, fallback to 'pat-1' if none provided
    if (!id) {
      id = "pat-1";
    }

    const foundItem = exploreData.mockData.find(i => i.id === id);
    setItem(foundItem);
  }, []);

  if (!item) {
    return (
      <>
        <DetailHeader />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <p className="text-center py-10">{detailData.errorState.notFound}</p>
        </main>
      </>
    );
  }

  const handleAddReply = (text) => {
    const newReply = {
      date: new Date().toISOString().split('T')[0],
      text
    };
    
    setItem({
      ...item,
      replies: [...(item.replies || []), newReply]
    });
  };

  const handleLogin = () => {
    alert('Masuk dulu yuk untuk lanjut!'); 
    login(); 
  };

  return (
    <>
      <DetailHeader />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <DetailInfo item={item} isLoggedIn={user.isLoggedIn} onLogin={handleLogin} />
          <DetailReplies replies={item.replies} isLoggedIn={user.isLoggedIn} onAddReply={handleAddReply} />
        </div>
      </main>
    </>
  );
}
