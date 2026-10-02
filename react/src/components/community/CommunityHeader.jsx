import { communityData } from "../../data/community";

export default function CommunityHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-heading">{communityData.header.title}</h1>
        <p className="text-xs sm:text-sm text-text-muted mt-1">{communityData.header.subtitle}</p>
      </div>
      <button className="bg-primary-base hover:bg-primary-hover text-text-inverted font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 active:scale-95">
        <span>{communityData.header.shareButton}</span>
      </button>
    </div>
  );
}
