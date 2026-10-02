import { communityData } from "../../data/community";

export default function CommunityModal({ item, onClose, onAddComment, onLike, commentText, setCommentText }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="bg-bg-surface rounded-3xl max-w-xl w-full p-6 sm:p-7 border border-border-base shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 text-text-muted hover:text-text-base text-xl font-bold p-1 rounded-lg">✕</button>

        <div className="mb-3">
          <span className={`px-3 py-1 ${item.badgeBg} text-xs font-bold rounded-lg inline-block`}>{item.icon} {item.kategoriLabel}</span>
        </div>

        <h2 className="text-xl font-extrabold text-text-heading mb-2">{item.judul}</h2>
        <p className="text-xs text-primary-text font-semibold mb-4 flex items-center gap-1">{item.lokasi}</p>

        <div className="flex items-center gap-3 p-3 bg-bg-subtle rounded-2xl mb-4 border border-border-subtle">
          <div className={`w-10 h-10 rounded-full text-text-inverted font-bold text-sm flex items-center justify-center shadow-sm ${item.avatarBg}`}>
            {item.avatarLetter}
          </div>
          <div>
            <p className="font-bold text-xs sm:text-sm text-text-heading leading-tight">{item.author}</p>
            <p className="text-[11px] text-text-muted" dangerouslySetInnerHTML={{__html: item.authorInfo}}></p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">{item.deskripsiLengkap}</p>

        <div className="flex items-center justify-between py-3 border-y border-border-subtle mb-5">
          <button
            onClick={() => onLike(item.id)}
            className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-bg-subtle text-text-base hover:bg-danger-base/10 hover:text-danger-text transition active:scale-95"
          >
            <span>❤️</span>
            <span>{item.likes} Suka</span>
          </button>
          <span className="text-[10px] text-text-muted">{item.likedByText}</span>
        </div>

        <div>
          <h3 className="font-bold text-xs sm:text-sm text-text-heading mb-3 flex items-center gap-1.5">
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
    </div>
  );
}
