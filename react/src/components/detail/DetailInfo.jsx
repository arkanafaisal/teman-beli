import { detailData } from "../../data/detail";

export default function DetailInfo({ item, isLoggedIn, onLogin }) {
  const percent = Math.min(100, Math.round((item.currentQuota / item.targetQuota) * 100));
  const remainingQuota = item.targetQuota - item.currentQuota;
  
  let waText = detailData.actions.whatsappTemplate
    .replace("{creatorName}", item.creatorName)
    .replace("{title}", item.title);
  const waLink = `https://wa.me/${item.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="bg-bg-surface p-6 md:p-8 rounded-2xl border border-border-base shadow-sm space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-primary-soft text-primary-text rounded-full border border-primary-soft">
            {item.category}
          </span>
          <span className="text-xs text-text-muted">{detailData.card.deadlineLabel} {item.deadline}</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
        <p className="text-sm text-text-muted">
          {detailData.card.locationLabel} <span className="font-medium text-text-base">{item.area}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-bg-subtle rounded-xl border border-border-subtle">
        <div>
          <span className="text-xs text-text-muted block">{detailData.card.estimatedPriceLabel}</span>
          <span className="text-lg font-bold text-primary-text">Rp {item.unitPrice.toLocaleString('id-ID')}</span>
          <span className="text-xs text-text-muted">/{item.unit}</span>
        </div>
        <div>
          <span className="text-xs text-text-muted block">{detailData.card.remainingQuotaLabel}</span>
          <span className={`text-lg font-bold ${remainingQuota > 0 ? 'text-success-text' : 'text-danger-text'}`}>
            {remainingQuota > 0 ? `${remainingQuota}${item.unit}` : detailData.card.quotaFull}
          </span>
        </div>
        <div className="col-span-2 md:col-span-1">
          <span className="text-xs text-text-muted block">{detailData.card.targetQuotaLabel}</span>
          <span className="text-lg font-bold">{item.targetQuota} {item.unit}</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs font-medium mb-1">
          <span>{detailData.card.progressLabel} ({item.currentQuota} {item.unit})</span>
          <span className="text-primary-text font-bold">{percent}%</span>
        </div>
        <div className="w-full bg-bg-subtle h-3 rounded-full overflow-hidden">
          <div className="bg-primary-base h-full rounded-full" style={{ width: `${percent}%` }}></div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h3 className="font-semibold text-sm">{detailData.card.notesLabel}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{item.notes || detailData.card.emptyNotes}</p>
        {item.refLink && (
          <a href={item.refLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary-text hover:underline">
            {detailData.card.refLinkLabel}
          </a>
        )}
      </div>

      <div className="p-4 border border-border-base rounded-xl flex items-center justify-between">
        <div>
          <span className="text-xs text-text-muted block">{detailData.creator.createdBy}</span>
          <span className="font-semibold text-sm">{isLoggedIn ? item.creatorName : detailData.creator.protectedName}</span>
          {isLoggedIn && (
            <span className="ml-2 text-xs text-primary-text font-semibold">{detailData.creator.verifiedBadge}</span>
          )}
        </div>
      </div>

      <div>
        {isLoggedIn ? (
          <a href={waLink} target="_blank" rel="noreferrer" className="w-full bg-success-base hover:bg-success-base text-text-inverted font-medium py-3 rounded-xl transition flex items-center justify-center gap-2">
            {detailData.actions.whatsappButton}
          </a>
        ) : (
          <button 
            onClick={onLogin} 
            className="w-full bg-bg-subtle text-text-muted font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {detailData.actions.lockedButton}
          </button>
        )}
      </div>
    </div>
  );
}
