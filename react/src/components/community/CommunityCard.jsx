import { getCategoryIcon, getCategoryColor } from "../../utils/iconMapper";
import { MapPin, Heart, MessageCircle } from "lucide-react";

export default function CommunityCard({ item, onClick }) {
  const badgeTextColor = item.badgeBg.split(' ').find(c => c.startsWith('text-')) || "text-primary-text";

  return (
    <div 
      onClick={() => onClick(item)}
      className="p-5 bg-bg-surface rounded-2xl sm:rounded-3xl border border-border-subtle shadow-sm hover:shadow-md hover:border-primary-base/50 transition cursor-pointer flex flex-col justify-between group active:scale-98"
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className={getCategoryColor(item.icon).split(' ')[0]}>
            {getCategoryIcon(item.icon, "w-5 h-5")}
          </span>
          <span className={`text-[11px] sm:text-xs font-bold ${badgeTextColor}`}>
            {item.kategoriLabel}
          </span>
        </div>
        <h3 className="font-bold text-sm sm:text-base text-text-heading mb-1 group-hover:text-primary-text transition">{item.judul}</h3>
        <p className="text-[11px] text-primary-text font-semibold mb-2 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {item.lokasi}
        </p>
        <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">{item.ringkasan}</p>
      </div>
      
      <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted">
        <span className="flex items-center gap-1.5 font-medium text-text-base">
          <span className={`w-5 h-5 rounded-full ${item.avatarBg} text-text-inverted font-bold text-[9px] flex items-center justify-center`}>{item.avatarLetter}</span>
          <span>{item.author}</span>
        </span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" strokeWidth={2.5} /> {item.likes}</span>
          <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" strokeWidth={2.5} /> {item.comments.length}</span>
        </span>
      </div>
    </div>
  );
}
