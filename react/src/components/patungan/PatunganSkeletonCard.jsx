export default function PatunganSkeletonCard() {
  return (
    <div className="bg-bg-surface rounded-2xl sm:rounded-3xl border border-border-base overflow-hidden flex flex-col h-[280px] shadow-sm">
      {/* Card Header */}
      <div className="border-b border-border-subtle bg-bg-subtle/30 flex justify-between items-center px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="h-4 w-20 bg-border-base/50 rounded animate-pulse"></div>
        <div className="h-4 w-16 bg-border-base/50 rounded animate-pulse"></div>
      </div>
      
      {/* Card Body */}
      <div className="flex-grow flex flex-col justify-between px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <div>
          <div className="h-6 w-3/4 bg-border-base/50 rounded animate-pulse mb-3"></div>
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="w-4 h-4 bg-border-base/50 rounded-full animate-pulse"></div>
            <div className="h-3 w-1/2 bg-border-base/50 rounded animate-pulse"></div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4 sm:mb-5 mt-auto">
          <div className="flex justify-between mb-2">
            <div className="h-3 w-32 bg-border-base/50 rounded animate-pulse"></div>
            <div className="h-3 w-8 bg-border-base/50 rounded animate-pulse"></div>
          </div>
          <div className="w-full bg-border-subtle h-2 sm:h-2.5 rounded-full overflow-hidden"></div>
        </div>
        
        {/* Price & Action */}
        <div className="flex items-end justify-between pt-4 border-t border-border-subtle mt-2">
          <div>
            <div className="h-3 w-20 bg-border-base/50 rounded animate-pulse mb-2"></div>
            <div className="h-5 w-28 bg-border-base/50 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-24 bg-border-base/50 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
