export default function CommunityCard({ item, onClick }) {
  return (
    <div 
      onClick={() => onClick(item)}
      className="p-5 bg-bg-surface rounded-2xl sm:rounded-3xl border border-border-subtle shadow-sm hover:shadow-md hover:border-primary-base/50 transition cursor-pointer flex flex-col justify-between group active:scale-98"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{item.icon}</span>
          <span className={`px-2.5 py-1 ${item.badgeBg} text-[10px] font-bold rounded-lg`}>
            {item.kategoriLabel}
          </span>
        </div>
        <h3 className="font-bold text-sm sm:text-base text-text-heading mb-1 group-hover:text-primary-text transition">{item.judul}</h3>
        <p className="text-[11px] text-primary-text font-semibold mb-2">{item.lokasi}</p>
        <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">{item.ringkasan}</p>
      </div>
      
      <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
        <span className="flex items-center gap-1.5 font-medium text-text-base">
          <span className={`w-5 h-5 rounded-full ${item.avatarBg} text-text-inverted font-bold text-[9px] flex items-center justify-center`}>{item.avatarLetter}</span>
          <span>{item.author}</span>
        </span>
        <span className="flex items-center gap-2">
          <span>❤️ {item.likes}</span>
          <span>💬 {item.comments.length}</span>
        </span>
      </div>
    </div>
  );
}
