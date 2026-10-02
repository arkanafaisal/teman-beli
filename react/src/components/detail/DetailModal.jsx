import { useState, useEffect } from "react";
import DetailInfo from "./DetailInfo";
import DetailReplies from "./DetailReplies";
import { useAuth } from "../../context/AuthContext";

export default function DetailModal({ item, onClose }) {
  const { user, login } = useAuth();
  const [localItem, setLocalItem] = useState(item);
  const [isClosing, setIsClosing] = useState(false);

  if (!localItem) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 280);
  };

  const handleAddReply = (text) => {
    const newReply = {
      date: new Date().toISOString().split('T')[0],
      text
    };

    setLocalItem({
      ...localItem,
      replies: [...(localItem.replies || []), newReply]
    });
  };

  const handleLogin = () => {
    alert('Masuk dulu yuk untuk lanjut!');
    login();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`} onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()} className={`bg-bg-surface w-full sm:max-w-xl rounded-t-[32px] sm:rounded-3xl shadow-2xl relative flex flex-col max-h-[65vh] sm:max-h-[85vh] mt-16 sm:mt-0 ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}>
        <div className="sticky top-0 z-10 bg-bg-surface px-5 py-4 pt-3 rounded-t-[32px] flex flex-col items-center">
          <div className="w-12 h-1.5 bg-border-base rounded-full"></div>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 no-scrollbar pb-10">
          <DetailInfo item={localItem} isLoggedIn={user?.isLoggedIn} onLogin={handleLogin} />
          <DetailReplies replies={localItem.replies} isLoggedIn={user?.isLoggedIn} onAddReply={handleAddReply} />
        </div>
      </div>
    </div>
  );
}
