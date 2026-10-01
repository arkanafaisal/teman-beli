import { exploreData } from "../../data/explore";

export default function FeedCard({ item }) {
  const percent = Math.min(100, Math.round((item.currentQuota / item.targetQuota) * 100));

  return (
    <a href={`/detail/${item.id}`} className="group bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition duration-300 flex flex-col h-full active:scale-[0.98]">
      {/* Card Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
        <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-600 shadow-sm">
          {item.category}
        </span>
        <span className="text-[10px] sm:text-xs font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-md">
          {exploreData.card.until} {item.deadline}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mb-1.5 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-5 flex items-center gap-1">
            <span className="text-blue-500">📍</span> {item.area}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-5">
          <div className="flex justify-between text-[10px] sm:text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-300">
            <span>{exploreData.card.collected} {item.currentQuota}/{item.targetQuota} {item.unit}</span>
            <span className="text-blue-600 dark:text-blue-400">{percent}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 sm:h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between pt-4 border-t border-slate-100 dark:border-slate-700/60">
          <div>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mb-0.5">{exploreData.card.estimatedPortion}</p>
            <p className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
              Rp {item.unitPrice.toLocaleString("id-ID")}
              <span className="text-[10px] sm:text-xs text-slate-500 font-normal">/{item.unit}</span>
            </p>
          </div>
          <span className="text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
            {exploreData.card.detailButton}
          </span>
        </div>
      </div>
    </a>
  );
}
