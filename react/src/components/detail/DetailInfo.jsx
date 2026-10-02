import { detailData } from "../../data/detail";
import { MapPin, Link as LinkIcon, MessageCircle, Lock } from "lucide-react";

export default function DetailInfo({ item, isLoggedIn, onLogin }) {
  const percent = Math.min(100, Math.round((item.currentQuota / item.targetQuota) * 100));
  const remainingQuota = item.targetQuota - item.currentQuota;

  let waText = detailData.actions.whatsappTemplate
    .replace("{creatorName}", item.creatorName)
    .replace("{title}", item.title);
  const waLink = `https://wa.me/${item.whatsapp}?text=${encodeURIComponent(waText)}`;

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

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-primary-text">
            {item.category}
          </span>
          <span className="text-[10px] sm:text-xs font-extrabold text-danger-base tracking-wide">
            {getRelativeTime(item.deadline)}
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
        <p className="text-sm text-text-muted flex items-center gap-1">
          <MapPin className="w-4 h-4 shrink-0 text-primary-text" strokeWidth={2.5} />
          {detailData.card.locationLabel} <span className="font-medium text-text-base">{item.area}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <span className="text-xs text-text-muted block">{detailData.card.estimatedPriceLabel}</span>
          <span className="text-lg font-bold text-primary-text">Rp {item.unitPrice.toLocaleString('id-ID')}</span>
          <span className="text-xs text-text-muted">/{item.unit}</span>
        </div>
        <div>
          <span className="text-xs text-text-muted block">{detailData.card.remainingQuotaLabel}</span>
          <span className={`text-lg font-bold ${remainingQuota > 0 ? 'text-success-text' : 'text-danger-text'}`}>
            {remainingQuota > 0 ? `${remainingQuota} ${item.unit}` : detailData.card.quotaFull}
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
        </div>
        <div className="w-full bg-bg-subtle h-4 sm:h-5 rounded-full overflow-hidden flex items-center">
          <div className="bg-primary-base h-full rounded-full flex items-center justify-center min-w-[2.5rem]" style={{ width: `${percent}%` }}>
            <span className="text-[10px] sm:text-xs text-text-inverted font-bold">{percent}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h3 className="font-semibold text-sm">{detailData.card.notesLabel}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{item.notes || detailData.card.emptyNotes}</p>
        {item.refLink && (
          <a href={item.refLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-primary-text hover:underline">
            <LinkIcon className="w-3.5 h-3.5" />
            {detailData.card.refLinkLabel}
          </a>
        )}
      </div>

      <div className="py-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-text-muted block">{detailData.creator.createdBy}</span>
          <span className="font-semibold text-sm">{isLoggedIn ? item.creatorName : detailData.creator.protectedName}</span>
        </div>
      </div>

      <div>
        {isLoggedIn ? (
          <a href={waLink} target="_blank" rel="noreferrer" className="w-full bg-success-base hover:bg-success-base text-text-inverted font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            {detailData.actions.whatsappButton}
          </a>
        ) : (
          <button
            onClick={onLogin}
            className="w-full bg-bg-subtle border border-border-base text-text-muted sm:text-xs font-bold py-3.5 px-4 rounded-xl transition cursor-not-allowed opacity-80 hover:opacity-100"
          >
            <Lock className="inline-block w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 -mt-0.5" strokeWidth={2.5} />
            {detailData.actions.lockedButton}
          </button>
        )}
      </div>
    </div>
  );
}
