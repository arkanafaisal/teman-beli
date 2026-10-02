import { exploreData } from "../../data/explore";
import FeedCard from "./FeedCard";

export default function ExploreFeed({ items }) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center" data-aos="fade-up">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-bold text-text-heading mb-2">{exploreData.emptyState.message}</h3>
        <p className="text-sm text-text-muted">{exploreData.emptyState.subMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <div key={item.id} data-aos="fade-up" data-aos-delay={(idx % 3) * 100}>
          <FeedCard item={item} />
        </div>
      ))}
    </div>
  );
}
