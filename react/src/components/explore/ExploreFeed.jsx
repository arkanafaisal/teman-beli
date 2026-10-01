import { exploreData } from "../../data/explore";
import FeedCard from "./FeedCard";

export default function ExploreFeed({ items }) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center" data-aos="fade-up">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{exploreData.emptyState.message}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{exploreData.emptyState.subMessage}</p>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((item, idx) => (
          <div key={item.id} data-aos="fade-up" data-aos-delay={(idx % 3) * 100}>
            <FeedCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
