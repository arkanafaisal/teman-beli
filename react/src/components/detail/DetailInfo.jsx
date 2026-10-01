import { detailData } from "../../data/detail";

export default function DetailInfo({ item, isLoggedIn, onLogin }) {
  const percent = Math.min(100, Math.round((item.currentQuota / item.targetQuota) * 100));
  const remainingQuota = item.targetQuota - item.currentQuota;
  
  let waText = detailData.actions.whatsappTemplate
    .replace("{creatorName}", item.creatorName)
    .replace("{title}", item.title);
  const waLink = `https://wa.me/${item.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
            {item.category}
          </span>
          <span className="text-xs text-slate-400">{detailData.card.deadlineLabel} {item.deadline}</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {detailData.card.locationLabel} <span className="font-medium text-slate-700 dark:text-slate-200">{item.area}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700">
        <div>
          <span className="text-xs text-slate-400 block">{detailData.card.estimatedPriceLabel}</span>
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">Rp {item.unitPrice.toLocaleString('id-ID')}</span>
          <span className="text-xs text-slate-500">/{item.unit}</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 block">{detailData.card.remainingQuotaLabel}</span>
          <span className={`text-lg font-bold ${remainingQuota > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
            {remainingQuota > 0 ? `${remainingQuota}${item.unit}` : detailData.card.quotaFull}
          </span>
        </div>
        <div className="col-span-2 md:col-span-1">
          <span className="text-xs text-slate-400 block">{detailData.card.targetQuotaLabel}</span>
          <span className="text-lg font-bold">{item.targetQuota} {item.unit}</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs font-medium mb-1">
          <span>{detailData.card.progressLabel} ({item.currentQuota} {item.unit})</span>
          <span className="text-blue-600 font-bold">{percent}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${percent}%` }}></div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h3 className="font-semibold text-sm">{detailData.card.notesLabel}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.notes || detailData.card.emptyNotes}</p>
        {item.refLink && (
          <a href={item.refLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
            {detailData.card.refLinkLabel}
          </a>
        )}
      </div>

      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">{detailData.creator.createdBy}</span>
          <span className="font-semibold text-sm">{isLoggedIn ? item.creatorName : detailData.creator.protectedName}</span>
          {isLoggedIn && (
            <span className="ml-2 text-xs text-blue-600 font-semibold">{detailData.creator.verifiedBadge}</span>
          )}
        </div>
      </div>

      <div>
        {isLoggedIn ? (
          <a href={waLink} target="_blank" rel="noreferrer" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2">
            {detailData.actions.whatsappButton}
          </a>
        ) : (
          <button 
            onClick={onLogin} 
            className="w-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {detailData.actions.lockedButton}
          </button>
        )}
      </div>
    </div>
  );
}
