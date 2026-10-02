import { useState, useEffect } from "react";
import DetailInfo from "./DetailInfo";
import DetailReplies from "./DetailReplies";
import { useAuth } from "../../context/AuthContext";
import BottomModalWrapper from "../common/BottomModalWrapper";

export default function DetailModal({ item, onClose }) {
  const { user, login } = useAuth();
  const [localItem, setLocalItem] = useState(item);
  const [isClosing, setIsClosing] = useState(false);

  if (!localItem) return null;

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
    <BottomModalWrapper onClose={onClose}>
      <DetailInfo item={localItem} isLoggedIn={user?.isLoggedIn} onLogin={handleLogin} />
      <DetailReplies replies={localItem.replies} isLoggedIn={user?.isLoggedIn} onAddReply={handleAddReply} />
    </BottomModalWrapper>
  );
}
