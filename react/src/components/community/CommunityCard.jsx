export default function CommunityCard({ item, onClick }) {
  return (
    <div 
      onClick={() => onClick(item)}
      className="p-5 bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-blue-500/50 transition cursor-pointer flex flex-col justify-between group active:scale-98"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{item.icon}</span>
          <span className={`px-2.5 py-1 ${item.badgeBg} text-[10px] font-bold rounded-lg`}>
            {item.kategoriLabel}
          </span>
        </div>
        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{item.judul}</h3>
        <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mb-2">{item.lokasi}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">{item.ringkasan}</p>
      </div>
      
      <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
          <span className={`w-5 h-5 rounded-full ${item.avatarBg} text-white font-bold text-[9px] flex items-center justify-center`}>{item.avatarLetter}</span>
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
