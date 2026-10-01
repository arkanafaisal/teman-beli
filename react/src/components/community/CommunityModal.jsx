import { communityData } from "../../data/community";

export default function CommunityModal({ item, onClose, onAddComment, onLike, commentText, setCommentText }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl font-bold p-1 rounded-lg">✕</button>

        <div className="mb-3">
          <span className={`px-3 py-1 ${item.badgeBg} text-xs font-bold rounded-lg inline-block`}>{item.icon} {item.kategoriLabel}</span>
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">{item.judul}</h2>
        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-4 flex items-center gap-1">{item.lokasi}</p>

        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl mb-4 border border-slate-100 dark:border-slate-700">
          <div className={`w-10 h-10 rounded-full text-white font-bold text-sm flex items-center justify-center shadow-sm ${item.avatarBg}`}>
            {item.avatarLetter}
          </div>
          <div>
            <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">{item.author}</p>
            <p className="text-[11px] text-slate-400" dangerouslySetInnerHTML={{__html: item.authorInfo}}></p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{item.deskripsiLengkap}</p>

        <div className="flex items-center justify-between py-3 border-y border-slate-100 dark:border-slate-700 mb-5">
          <button
            onClick={() => onLike(item.id)}
            className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition active:scale-95"
          >
            <span>❤️</span>
            <span>{item.likes} Suka</span>
          </button>
          <span className="text-[10px] text-slate-400">{item.likedByText}</span>
        </div>

        <div>
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
            <span>{communityData.modal.commentCountPrefix}</span>
            <span className="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full font-extrabold">{item.comments.length}</span>
          </h3>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={communityData.modal.commentInputPlaceholder}
              className="flex-grow text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={() => onAddComment(item.id)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition active:scale-95">
              {communityData.modal.commentSubmitButton}
            </button>
          </div>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 no-scrollbar">
            {item.comments.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">{communityData.modal.emptyComments}</p>
            ) : (
              item.comments.map((c, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{c.author}</span>
                    <span className="text-[10px] text-slate-400">{c.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{c.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
