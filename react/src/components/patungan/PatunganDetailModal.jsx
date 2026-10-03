import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import BottomModalWrapper from "../common/BottomModalWrapper";
import { patunganDetailData } from "../../data/patunganDetail";
import { MapPin, Link as LinkIcon, MessageCircle, Lock } from "lucide-react";


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
    alert('Masuk dulu yuk untuk lanjut!');
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

  let waText = patunganDetailData.actions.whatsappTemplate
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
          {patunganDetailData.card.locationLabel} <span className="font-medium text-text-base">{item.area}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <span className="text-xs text-text-muted block">{patunganDetailData.card.estimatedPriceLabel}</span>
          <span className="text-lg font-bold text-primary-text">Rp {item.unitPrice.toLocaleString('id-ID')}</span>
          <span className="text-xs text-text-muted">/{item.unit}</span>
        </div>
        <div>
          <span className="text-xs text-text-muted block">{patunganDetailData.card.remainingQuotaLabel}</span>
          <span className={`text-lg font-bold ${remainingQuota > 0 ? 'text-success-text' : 'text-danger-text'}`}>
            {remainingQuota > 0 ? `${remainingQuota} ${item.unit}` : patunganDetailData.card.quotaFull}
          </span>
        </div>
        <div className="col-span-2 md:col-span-1">
          <span className="text-xs text-text-muted block">{patunganDetailData.card.targetQuotaLabel}</span>
          <span className="text-lg font-bold">{item.targetQuota} {item.unit}</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs font-medium mb-1">
          <span>{patunganDetailData.card.progressLabel} ({item.currentQuota} {item.unit})</span>
        </div>
        <div className="w-full bg-bg-subtle h-4 sm:h-5 rounded-full overflow-hidden flex items-center">
          <div className="bg-primary-base h-full rounded-full flex items-center justify-center min-w-[2.5rem]" style={{ width: `${percent}%` }}>
            <span className="text-[10px] sm:text-xs text-text-inverted font-bold">{percent}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h3 className="font-semibold text-sm">{patunganDetailData.card.notesLabel}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{item.notes || patunganDetailData.card.emptyNotes}</p>
        {item.refLink && (
          <a href={item.refLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-primary-text hover:underline">
            <LinkIcon className="w-3.5 h-3.5" />
            {patunganDetailData.card.refLinkLabel}
          </a>
        )}
      </div>

      <div className="py-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-text-muted block">{patunganDetailData.creator.createdBy}</span>
          <span className="font-semibold text-sm">{isLoggedIn ? item.creatorName : patunganDetailData.creator.protectedName}</span>
        </div>
      </div>

      <div>
        {isLoggedIn ? (
          <a href={waLink} target="_blank" rel="noreferrer" className="w-full bg-success-base hover:bg-success-base text-text-inverted font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            {patunganDetailData.actions.whatsappButton}
          </a>
        ) : (
          <button
            onClick={onLogin}
            className="w-full bg-bg-subtle border border-border-base text-text-muted sm:text-xs font-bold py-3.5 px-4 rounded-xl transition cursor-not-allowed opacity-80 hover:opacity-100"
          >
            <Lock className="inline-block w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 -mt-0.5" strokeWidth={2.5} />
            {patunganDetailData.actions.lockedButton}
          </button>
        )}
      </div>
    </div>
  );
}

function PatunganReplies({ replies, isLoggedIn, onAddReply }) {
  const [replyText, setReplyText] = useState("");

  const handleAdd = () => {
    if (!replyText.trim()) return;
    onAddReply(replyText);
    setReplyText("");
  };

  return (
    <div className="space-y-4 pt-6 border-t border-border-base">
      <h3 className="font-bold text-base flex items-center gap-2">
        <span>{patunganDetailData.replies.title}</span>
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
          <p className="text-xs text-text-muted italic">{patunganDetailData.replies.emptyReplies}</p>
        )}
      </div>

      {isLoggedIn && (
        <div className="pt-3 border-t border-border-subtle flex gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={patunganDetailData.replies.inputPlaceholder}
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-border-base dark:bg-bg-subtle focus:outline-none"
          />
          <button onClick={handleAdd} className="bg-primary-base text-text-inverted text-xs px-4 py-2 rounded-lg font-medium">{patunganDetailData.replies.sendButton}</button>
        </div>
      )}
    </div>
  );
}