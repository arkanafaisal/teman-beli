export default function CommunitySkeletonCard() {
  return (
    <div className="p-5 bg-bg-surface rounded-2xl sm:rounded-3xl border border-border-subtle shadow-sm flex flex-col justify-between min-h-[220px]">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-border-base/50 rounded-full animate-pulse"></div>
          <div className="w-20 h-3 bg-border-base/50 rounded animate-pulse"></div>
        </div>
        <div className="h-5 w-3/4 bg-border-base/50 rounded animate-pulse mb-3"></div>
        <div className="h-3 w-1/3 bg-border-base/50 rounded animate-pulse mb-4"></div>
        <div className="h-3 w-full bg-border-base/50 rounded animate-pulse mb-2"></div>
        <div className="h-3 w-5/6 bg-border-base/50 rounded animate-pulse mb-4"></div>
      </div>
      
      <div className="pt-4 border-t border-border-subtle flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-border-base/50 rounded-full animate-pulse"></div>
          <div className="w-24 h-3 bg-border-base/50 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-3 bg-border-base/50 rounded animate-pulse"></div>
          <div className="w-10 h-3 bg-border-base/50 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
