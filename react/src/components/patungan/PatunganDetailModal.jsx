import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import BottomModalWrapper from "../common/BottomModalWrapper";
import CenterModalWrapper from "../common/CenterModalWrapper";
import { patunganData } from "../../data/patungan";
import { MapPin, Link as LinkIcon, MessageCircle, Lock, Edit } from "lucide-react";
import { getRelativeTime } from "../../utils/dateHelper";
import { commentSchema } from "../../validations/commentValidation";
import { toast } from "sonner";
import PatunganForm from "./PatunganForm";


export default function PatunganDetailModal({ item, onClose }) {
  const { user, login } = useAuth();
  const [localItem, setLocalItem] = useState(item);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!item?.id) return;

    const fetchDetail = async () => {
      const res = await api.patungan.getDetail(item.id);
      if (res.success && res.payload) {
        const fetchedLogs = res.payload.logs || [];
        const formattedReplies = fetchedLogs.map(log => ({
          date: new Date(log.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
          text: log.text
        }));

        setLocalItem(prev => ({
          ...prev,
          currentQuota: res.payload.currentQuota,
          status: res.payload.status,
          replies: formattedReplies,
          lastUpdated: fetchedLogs.length > 0 ? fetchedLogs[0].createdAt : prev.lastUpdated
        }));
      }
    };

    fetchDetail();
  }, [item?.id, refreshTrigger]);

  if (!localItem) return null;

  const isHost = user?.isLoggedIn && user?.id === localItem.hostId;

  const handleAddReply = async (text, onSuccess) => {
    const res = await api.patungan.addLog(localItem.id, { text });
    if (res.success) {
      setRefreshTrigger(prev => prev + 1);
      toast.success("Update status berhasil ditambahkan");
      if (onSuccess) onSuccess();
    } else {
      toast.error(res.message || "Gagal menambahkan pembaruan");
    }
  };

  const handleLogin = () => {
    toast.error(patunganData.detail.alerts.loginRequired);
    login();
  };

  return (
    <>
      <BottomModalWrapper onClose={onClose}>
        <PatunganDetail item={localItem} isLoggedIn={user?.isLoggedIn} onLogin={handleLogin} isHost={isHost} onEdit={() => setIsEditModalOpen(true)} />
        <PatunganReplies replies={localItem.replies} isLoggedIn={user?.isLoggedIn} isHost={isHost} onAddReply={handleAddReply} />
      </BottomModalWrapper>

      {isEditModalOpen && (
        <CenterModalWrapper title={patunganData.form.editModalTitle} onClose={() => setIsEditModalOpen(false)}>
          <PatunganForm
            initialData={localItem}
            onSuccess={() => {
              setIsEditModalOpen(false);
              setRefreshTrigger(prev => prev + 1);
            }}
          />
        </CenterModalWrapper>
      )}
    </>
  );
}


function PatunganDetail({ item, isLoggedIn, onLogin, isHost, onEdit }) {
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
            {item.category === "PANGAN" ? "Pangan" : item.category === "KOS" ? "Kos & Fasilitas" : item.category === "KAMPUS" ? "Kebutuhan Kampus" : item.category === "DIGITAL" ? "Layanan Digital" : item.category}
          </span>
          <div className="flex flex-col items-end">
            <span className="text-[10px] sm:text-xs font-extrabold text-danger-base tracking-wide">
              {getRelativeTime(item.deadline)}
            </span>
            {item.lastUpdated && (
              <span className="text-[10px] text-text-muted mt-0.5 font-medium">
                Update Terakhir: {new Date(item.lastUpdated).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </span>
            )}
          </div>
        </div>
        <div className="relative mb-2">
          <h1 className="text-2xl font-bold pr-10">{item.title}</h1>
          {isHost && (
            <button
              onClick={onEdit}
              className="absolute right-0 top-0 p-2 bg-warning-base text-text-inverted rounded-xl flex items-center justify-center transition hover:bg-warning-hover shadow-sm cursor-pointer"
              title="Edit Patungan"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
        </div>
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

function PatunganReplies({ replies, isLoggedIn, isHost, onAddReply }) {
  const [replyText, setReplyText] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const result = commentSchema.safeParse({ text: replyText });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    onAddReply(replyText, () => {
      setReplyText("");
      setError("");
    });
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

      {isLoggedIn && isHost && (
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
              className={`flex-1 px-3 py-2 text-xs rounded-lg border dark:bg-bg-subtle focus:outline-none transition-colors ${error ? "border-danger-base focus:border-danger-base" : "border-border-base focus:border-primary-base"
                }`}
            />
            <button onClick={handleAdd} className="cursor-pointer bg-primary-base text-text-inverted text-xs px-4 py-2 rounded-lg font-medium">{patunganData.detail.replies.sendButton}</button>
          </div>
          {error && <span className="text-[10px] text-danger-base font-medium px-1">{error}</span>}
        </div>
      )}
    </div>
  );
}