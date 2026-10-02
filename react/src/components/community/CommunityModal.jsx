import { communityData } from "../../data/community";
import { getCategoryIcon, getCategoryColor } from "../../utils/iconMapper";
import { MapPin, Heart, MessageCircle } from "lucide-react";
import BottomModalWrapper from "../common/BottomModalWrapper";

export default function CommunityModal({ item, onClose, onAddComment, onLike, commentText, setCommentText }) {
  if (!item) return null;

  return (
    <BottomModalWrapper onClose={onClose}>
      <div className="flex flex-col h-full">
        <div className="mb-3 flex items-center gap-2">
          <span className={getCategoryColor(item.icon).split(' ')[0]}>
            {getCategoryIcon(item.icon, "w-4 h-4")}
          </span>
          <span className={`text-xs font-bold ${item.badgeBg.split(' ').find(c => c.startsWith('text-')) || 'text-primary-text'}`}>
            {item.kategoriLabel}
          </span>
        </div>

        <h2 className="text-xl font-extrabold text-text-heading mb-2">{item.judul}</h2>
        <p className="text-xs text-primary-text font-semibold mb-4 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          {item.lokasi}
        </p>

        <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">{item.deskripsiLengkap}</p>

        <div className="flex items-center gap-1 py-4 border-y border-border-subtle mb-6">
          <button
            onClick={() => onLike(item.id)}
            className={`relative flex items-center justify-center p-2 transition active:scale-95 ${item.isLiked ? 'text-danger-base' : 'text-text-muted hover:text-danger-base'}`}
          >
            <Heart className={`w-8 h-8 ${item.isLiked ? 'fill-current' : ''}`} strokeWidth={1.2} />
            <span className={`absolute translate-y-[0.3px] text-[10px] font-black mt-[-2px] ${item.isLiked ? 'text-white' : 'text-text-heading'}`}>{item.likes}</span>
          </button>

          <div className="flex items-center gap-3 text-left max-w-[70%]">
            <div className={`w-10 h-10 rounded-full text-text-inverted font-bold text-sm flex items-center justify-center shadow-sm shrink-0 ${item.avatarBg}`}>
              {item.avatarLetter}
            </div>
            <div className="truncate">
              <p className="font-bold text-xs sm:text-sm text-text-heading leading-tight truncate">{item.author}</p>
              <p className="text-[10px] sm:text-[11px] text-text-muted truncate" dangerouslySetInnerHTML={{ __html: item.authorInfo }}></p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xs sm:text-sm text-text-heading mb-3 flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-text-muted" strokeWidth={2.5} />
            <span>{communityData.modal.commentCountPrefix}</span>
            <span className="text-[10px] px-2 py-0.5 bg-primary-soft text-primary-text rounded-full font-extrabold">{item.comments.length}</span>
          </h3>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={communityData.modal.commentInputPlaceholder}
              className="flex-grow text-xs px-3.5 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle text-text-base outline-none focus:ring-2 focus:ring-primary-base"
            />
            <button onClick={() => onAddComment(item.id)} className="bg-primary-base hover:bg-primary-hover text-text-inverted font-semibold text-xs px-4 py-2.5 rounded-xl transition active:scale-95">
              {communityData.modal.commentSubmitButton}
            </button>
          </div>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 no-scrollbar">
            {item.comments.length === 0 ? (
              <p className="text-xs text-text-muted italic py-2">{communityData.modal.emptyComments}</p>
            ) : (
              item.comments.map((c, idx) => (
                <div key={idx} className="p-3 bg-bg-subtle rounded-xl border border-border-subtle">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-text-heading">{c.author}</span>
                    <span className="text-[10px] text-text-muted">{c.date}</span>
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
