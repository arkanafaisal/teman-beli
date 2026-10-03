import { patunganData } from "../../data/patungan";
import { MapPin } from "lucide-react";

export default function PatunganCard({ item, onClick, index = 0 }) {
  const percent = Math.min(100, Math.round((item.currentQuota / item.targetQuota) * 100));

  const getRelativeTime = (deadline) => {
    const now = new Date();
    const target = new Date(deadline);
    const diffMs = target - now;

    if (diffMs <= 0) return "Berakhir";

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffDays > 0) return `${diffDays} hari lagi`;
    if (diffHours > 0) return `${diffHours} jam lagi`;
    return "Segera berakhir";
  };

  const CardContent = (
    <>
      {/* Card Header */}
      <div className="border-b border-border-subtle bg-bg-subtle/50 flex justify-between items-center px-4 pt-2 sm:px-5 sm:pt-2">
        <span className="text-[10px] sm:text-xs font-bold text-text-muted bg-bg-surface py-1 rounded-md border border-border-subtle shadow-sm">
          {item.category}
        </span>
        <span className="text-[10px] sm:text-xs font-extrabold text-danger-base tracking-wide shrink-0">
          {getRelativeTime(item.deadline)}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex-grow flex flex-col justify-between px-4 pb-4 sm:px-5 sm:pb-5">
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
            <span>{patunganData.feed.card.collected} {item.currentQuota}/{item.targetQuota} {item.unit}</span>
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
            <p className="text-[10px] sm:text-xs text-text-muted mb-0.5">{patunganData.feed.card.estimatedPortion}</p>
            <p className="font-black text-text-heading text-sm sm:text-base">
              Rp {item.unitPrice.toLocaleString("id-ID")}
              <span className="text-[10px] sm:text-xs text-text-muted font-normal">/{item.unit}</span>
            </p>
          </div>
          <span className="text-primary-text font-bold text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
            {patunganData.feed.card.detailButton}
          </span>
        </div>
      </div>
    </>
  );

  const containerClasses = `group bg-bg-surface rounded-2xl sm:rounded-3xl border border-border-base overflow-hidden hover:shadow-xl hover:border-primary-soft transition duration-300 flex flex-col h-full active:scale-[0.98] ${onClick ? 'cursor-pointer' : ''}`;

  if (onClick) {
    return (
      <div onClick={() => onClick(item)} className={containerClasses} data-aos="fade-up" data-aos-delay={index * 100}>
        {CardContent}
      </div>
    );
  }

  return (
    <a href={`/detail/${item.id}`} className={containerClasses} data-aos="fade-up" data-aos-delay={index * 100}>
      {CardContent}
    </a>
  );
}
