import { exploreData } from "../../data/explore";
import { MapPin } from "lucide-react";

export default function FeedCard({ item }) {
  const percent = Math.min(100, Math.round((item.currentQuota / item.targetQuota) * 100));

  return (
    <a href={`/detail/${item.id}`} className="group bg-bg-surface rounded-2xl sm:rounded-3xl border border-border-base overflow-hidden hover:shadow-xl hover:border-primary-soft transition duration-300 flex flex-col h-full active:scale-[0.98]">
      {/* Card Header */}
      <div className="p-4 sm:p-5 border-b border-border-subtle bg-bg-subtle/50 flex justify-between items-center">
        <span className="text-[10px] sm:text-xs font-bold text-text-muted bg-bg-surface px-2.5 py-1 rounded-md border border-border-subtle shadow-sm">
          {item.category}
        </span>
        <span className="text-[10px] sm:text-xs font-semibold text-danger-text bg-danger-base/10 px-2.5 py-1 rounded-md">
          {exploreData.card.until} {item.deadline}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-text-heading mb-1.5 line-clamp-2 group-hover:text-primary-text transition">
            {item.title}
          </h3>
          <p className="text-xs text-text-muted mb-4 sm:mb-5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary-text shrink-0" strokeWidth={2.5} /> <span className="line-clamp-1">{item.area}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-5">
          <div className="flex justify-between text-[10px] sm:text-xs font-semibold mb-1.5 text-text-muted">
            <span>{exploreData.card.collected} {item.currentQuota}/{item.targetQuota} {item.unit}</span>
            <span className="text-primary-text">{percent}%</span>
          </div>
          <div className="w-full bg-bg-subtle h-2 sm:h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-primary-gradient h-full rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between pt-4 border-t border-border-subtle">
          <div>
            <p className="text-[10px] sm:text-xs text-text-muted mb-0.5">{exploreData.card.estimatedPortion}</p>
            <p className="font-black text-text-heading text-sm sm:text-base">
              Rp {item.unitPrice.toLocaleString("id-ID")}
              <span className="text-[10px] sm:text-xs text-text-muted font-normal">/{item.unit}</span>
            </p>
          </div>
          <span className="text-primary-text font-bold text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
            {exploreData.card.detailButton}
          </span>
        </div>
      </div>
    </a>
  );
}
