import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import BottomModalWrapper from "../common/BottomModalWrapper";
import { patunganData } from "../../data/patungan";
import { MapPin, Link as LinkIcon, MessageCircle, Lock } from "lucide-react";
import { getRelativeTime } from "../../utils/dateHelper";
import { commentSchema } from "../../validations/commentValidation";
import { toast } from "sonner";


export default function PatunganDetailModal({ item, onClose }) {
  const { user, login } = useAuth();
  const [localItem, setLocalItem] = useState(item);

  if (!localItem) return null;

  const handleAddReply = (text) => {
    const newReply = {
      date: new Date().toISOString().split('T')[0],
      text
    };

    setLocalItem({
      ...localItem,
      replies: [...(localItem.replies || []), newReply]
    });
  };

  const handleLogin = () => {
    toast.error(patunganData.detail.alerts.loginRequired);
    login();
  };

  return (
    <BottomModalWrapper onClose={onClose}>
      <PatunganDetail item={localItem} isLoggedIn={user?.isLoggedIn} onLogin={handleLogin} />
      <PatunganReplies replies={localItem.replies} isLoggedIn={user?.isLoggedIn} onAddReply={handleAddReply} />
    </BottomModalWrapper>
  );
}


function PatunganDetail({ item, isLoggedIn, onLogin }) {
  const percent = Math.min(100, Math.round((item.currentQuota / item.targetQuota) * 100));
  const remainingQuota = item.targetQuota - item.currentQuota;

  let waText = patunganData.detail.actions.whatsappTemplate
    .replace("{creatorName}", item.creatorName)
    .replace("{title}", item.title);
  const waLink = `https://wa.me/${item.whatsapp}?text=${encodeURIComponent(waText)}`;

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
          {patunganData.detail.card.locationLabel} <span className="font-medium text-text-base">{item.area}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <span className="text-xs text-text-muted block">{patunganData.detail.card.estimatedPriceLabel}</span>
          <span className="text-lg font-bold text-primary-text">Rp {item.unitPrice.toLocaleString('id-ID')}</span>
          <span className="text-xs text-text-muted">/{item.unit}</span>
        </div>
        <div>
          <span className="text-xs text-text-muted block">{patunganData.detail.card.remainingQuotaLabel}</span>
          <span className={`text-lg font-bold ${remainingQuota > 0 ? 'text-success-text' : 'text-danger-text'}`}>
            {remainingQuota > 0 ? `${remainingQuota} ${item.unit}` : patunganData.detail.card.quotaFull}
          </span>
        </div>
        <div className="col-span-2 md:col-span-1">
          <span className="text-xs text-text-muted block">{patunganData.detail.card.targetQuotaLabel}</span>
          <span className="text-lg font-bold">{item.targetQuota} {item.unit}</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs font-medium mb-1">
          <span>{patunganData.detail.card.progressLabel} ({item.currentQuota} {item.unit})</span>
        </div>
        <div className="w-full bg-bg-subtle h-4 sm:h-5 rounded-full overflow-hidden flex items-center">
          <div className="bg-primary-base h-full rounded-full flex items-center justify-center min-w-[2.5rem]" style={{ width: `${percent}%` }}>
            <span className="text-[10px] sm:text-xs text-text-inverted font-bold">{percent}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h3 className="font-semibold text-sm">{patunganData.detail.card.notesLabel}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{item.notes || patunganData.detail.card.emptyNotes}</p>
        {item.refLink && (
          <a href={item.refLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-primary-text hover:underline">
            <LinkIcon className="w-3.5 h-3.5" />
            {patunganData.detail.card.refLinkLabel}
          </a>
        )}
      </div>

      <div className="py-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-text-muted block">{patunganData.detail.creator.createdBy}</span>
          <span className="font-semibold text-sm">{isLoggedIn ? item.creatorName : patunganData.detail.creator.protectedName}</span>
        </div>
      </div>

      <div>
        {isLoggedIn ? (
          <a href={waLink} target="_blank" rel="noreferrer" className="w-full bg-success-base hover:bg-success-base text-text-inverted font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            {patunganData.detail.actions.whatsappButton}
          </a>
        ) : (
          <button
            onClick={onLogin}
            className="w-full bg-bg-subtle border border-border-base text-text-muted sm:text-xs font-bold py-3.5 px-4 rounded-xl transition cursor-not-allowed opacity-80 hover:opacity-100"
          >
            <Lock className="inline-block w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 -mt-0.5" strokeWidth={2.5} />
            {patunganData.detail.actions.lockedButton}
          </button>
        )}
      </div>
    </div>
  );
}

function PatunganReplies({ replies, isLoggedIn, onAddReply }) {
  const [replyText, setReplyText] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const result = commentSchema.safeParse({ text: replyText });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    
    onAddReply(replyText);
    setReplyText("");
    setError("");
  };

  return (
    <div className="space-y-4 pt-6 border-t border-border-base">
      <h3 className="font-bold text-base flex items-center gap-2">
        <span>{patunganData.detail.replies.title}</span>
      </h3>

      <div className="space-y-3">
        {replies && replies.length > 0 ? (
          replies.map((r, idx) => (
            <div key={idx} className="p-3 bg-bg-subtle rounded-xl text-xs space-y-1">
              <span className="text-text-muted font-medium">{r.date}</span>
              <p className="text-text-base">{r.text}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-text-muted italic">{patunganData.detail.replies.emptyReplies}</p>
        )}
      </div>

      {isLoggedIn && (
        <div className="pt-3 border-t border-border-subtle flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => {
                setReplyText(e.target.value);
                if (error) setError("");
              }}
              placeholder={patunganData.detail.replies.inputPlaceholder}
              className={`flex-1 px-3 py-2 text-xs rounded-lg border dark:bg-bg-subtle focus:outline-none transition-colors ${
                error ? "border-danger-base focus:border-danger-base" : "border-border-base focus:border-primary-base"
              }`}
            />
            <button onClick={handleAdd} className="bg-primary-base text-text-inverted text-xs px-4 py-2 rounded-lg font-medium">{patunganData.detail.replies.sendButton}</button>
          </div>
          {error && <span className="text-[10px] text-danger-base font-medium px-1">{error}</span>}
        </div>
      )}
    </div>
  );
}