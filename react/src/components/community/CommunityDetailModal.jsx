import { toast } from "sonner";
import { communityData } from "../../data/community";
import { getCategoryIcon, getCategoryColor, getCategoryStyles } from "../../utils/iconMapper";
import { MapPin, Heart, MessageCircle } from "lucide-react";
import BottomModalWrapper from "../common/BottomModalWrapper";
import { commentSchema } from "../../validations/commentValidation";
import { useState, useEffect } from "react";
import { getFullDateTime } from "../../utils/dateHelper";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";

export default function CommunityDetailModal({ item, onClose, onAddComment, onLike, commentText, setCommentText }) {
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [localItem, setLocalItem] = useState(item?.judul ? item : null);
  const [isLoading, setIsLoading] = useState(!item?.judul);

  useEffect(() => {
    if (!item?.id) return;
    
    const fetchDetail = async () => {
      if (!localItem) setIsLoading(true);
      
      const res = await api.community.getDetail({ id: item.id });
      if (res.success && res.payload) {
        const fullData = res.payload;
        const styles = getCategoryStyles(fullData.kategoriKey);
        const filterInfo = communityData.filters.find(f => f.value === fullData.kategoriKey) || {};

        const mappedData = {
          ...fullData,
          kategoriLabel: filterInfo.label || fullData.kategoriKey,
          icon: filterInfo.icon || "📌",
          badgeBg: styles.badgeBg,
          avatarBg: styles.avatarBg,
          avatarLetter: fullData.author ? fullData.author.charAt(0).toUpperCase() : "A",
        };
        setLocalItem(mappedData);
      } else {
        toast.error(res.message);
        onClose();
      }
      setIsLoading(false);
    };

    fetchDetail();
  }, [item?.id]);

  // Sync when Community.jsx updates activeItem (like for optimistic like)
  useEffect(() => {
    if (item?.judul) {
      setLocalItem(item);
    }
  }, [item]);

  if (!item) return null;

  if (isLoading || !localItem) {
    return (
      <BottomModalWrapper onClose={onClose}>
        <div className="flex justify-center items-center h-64 text-text-muted font-medium text-sm">
          Memuat detail komunitas...
        </div>
      </BottomModalWrapper>
    );
  }

  const handleCommentSubmit = () => {
    const result = commentSchema.safeParse({ text: commentText });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    onAddComment(localItem.id);
    setError("");
  };

  return (
    <BottomModalWrapper onClose={onClose}>
      <div className="flex flex-col h-full">
        <div className="mb-3 flex items-center gap-2">
          <span className={localItem.icon && getCategoryColor(localItem.icon).split(' ')[0]}>
            {getCategoryIcon(localItem.icon, "w-4 h-4")}
          </span>
          <span className={`text-xs font-bold ${localItem.badgeBg?.split(' ').find(c => c.startsWith('text-')) || ''}`}>
            {localItem.kategoriLabel}
          </span>
        </div>

        <h2 className="text-xl font-extrabold text-text-heading mb-2">{localItem.judul}</h2>
        <p className="text-xs text-primary-text font-semibold mb-4 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          {localItem.lokasi}
        </p>

        <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">{localItem.deskripsiLengkap}</p>

        <div className="flex items-center gap-1 py-4 border-y border-border-subtle mb-6">
          <button
            onClick={() => {
              if (user?.isLoggedIn) {
                setLocalItem(prev => ({
                  ...prev,
                  likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
                  isLiked: !prev.isLiked
                }));
              }
              onLike(localItem.id);
            }}
            className={`relative flex items-center justify-center p-2 transition active:scale-95 ${localItem.isLiked ? 'text-danger-base' : 'text-text-muted hover:text-danger-base'}`}
          >
            <Heart className={`w-8 h-8 ${localItem.isLiked ? 'fill-current' : ''}`} strokeWidth={1.2} />
            <span className={`absolute translate-y-[0.3px] text-[10px] font-black mt-[-2px] ${localItem.isLiked ? 'text-white' : 'text-text-heading'}`}>{localItem.likes}</span>
          </button>

          <div className="flex items-center gap-3 text-left max-w-[70%]">
            <div className={`w-10 h-10 rounded-full text-text-inverted font-bold text-sm flex items-center justify-center shadow-sm shrink-0 ${localItem.avatarBg}`}>
              {localItem.avatarLetter}
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-bold text-xs sm:text-sm text-text-heading leading-tight truncate">{localItem.author}</p>
                {user?.isLoggedIn && (
                  <span className="text-[10px] sm:text-xs font-medium text-warning-text flex items-center gap-0.5">
                    ⭐ {localItem.authorRating > 0 ? localItem.authorRating.toFixed(1) : "-"} <span className="text-text-muted font-normal">({localItem.authorReviewCount || 0})</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-[11px] text-text-muted truncate" dangerouslySetInnerHTML={{ __html: localItem.authorInfo }}></p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xs sm:text-sm text-text-heading mb-3 flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-text-muted" strokeWidth={2.5} />
            <span>{communityData.modal.commentCountPrefix}</span>
            <span className="text-[10px] px-2 py-0.5 bg-primary-soft text-primary-text rounded-full font-extrabold">{localItem.comments?.length || 0}</span>
          </h3>

          <div className="flex flex-col gap-1.5 mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                  if (error) setError("");
                }}
                placeholder={communityData.modal.commentInputPlaceholder}
                className={`flex-grow text-xs px-3.5 py-2.5 rounded-xl border dark:bg-bg-subtle text-text-base outline-none focus:ring-2 transition-colors ${
                  error ? "border-danger-base focus:ring-danger-base" : "border-border-base focus:ring-primary-base"
                }`}
              />
              <button onClick={handleCommentSubmit} className="bg-primary-base hover:bg-primary-hover text-text-inverted font-semibold text-xs px-4 py-2.5 rounded-xl transition active:scale-95">
                {communityData.modal.commentSubmitButton}
              </button>
            </div>
            {error && <span className="text-[10px] text-danger-base font-medium px-2">{error}</span>}
          </div>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 no-scrollbar">
            {localItem.comments?.length === 0 ? (
              <p className="text-xs text-text-muted italic py-2">{communityData.modal.emptyComments}</p>
            ) : (
              localItem.comments?.map((c, idx) => (
                <div key={idx} className="p-3 bg-bg-subtle rounded-xl border border-border-subtle">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-text-heading">{c.author}</span>
                    <span className="text-[10px] text-text-muted">{getFullDateTime(c.date)}</span>
                  </div>
                  <p className="text-xs text-text-muted leading-normal">{c.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </BottomModalWrapper>
  );
}
