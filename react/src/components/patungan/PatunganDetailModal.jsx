import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import BottomModalWrapper from "../common/BottomModalWrapper";
import CenterModalWrapper from "../common/CenterModalWrapper";
import { patunganData } from "../../data/patungan";
import { MapPin, Link as LinkIcon, MessageCircle, Lock, Edit, CheckCircle } from "lucide-react";
import { getRelativeTime, getFullDateTime } from "../../utils/dateHelper";
import { commentSchema } from "../../validations/commentValidation";
import { toast } from "sonner";
import PatunganForm from "./PatunganForm";
import ManageParticipantsModal from "./ManageParticipantsModal";

export default function PatunganDetailModal({ item, onClose }) {
  const { user, login } = useAuth();
  const [localItem, setLocalItem] = useState(item.title ? item : null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [proofLink, setProofLink] = useState("");
  const [finishError, setFinishError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!item?.id) return;

    const fetchDetail = async () => {
      const res = await api.patungan.getDetail({ id: item.id });
      if (res.success && res.payload) {
        const fetchedLogs = res.payload.logs || [];
        const formattedReplies = fetchedLogs.map(log => ({
          date: getFullDateTime(log.createdAt),
          text: log.text
        }));

        setLocalItem(prev => {
          const baseData = prev || item;
          const unitPrice = baseData.unitPrice || Math.round(res.payload.totalPrice / res.payload.targetQuota);
          const creatorName = res.payload.host?.name || baseData.creatorName;
          
          return {
            ...baseData,
            ...res.payload,
            unitPrice,
            creatorName,
            replies: formattedReplies,
            lastUpdated: fetchedLogs.length > 0 ? fetchedLogs[0].createdAt : baseData.lastUpdated
          };
        });
      }
    };

    fetchDetail();
  }, [item?.id, refreshTrigger]);

  if (!localItem?.title) {
    return (
      <BottomModalWrapper onClose={onClose}>
        <div className="flex justify-center items-center h-64 text-text-muted font-medium text-sm">
          Memuat detail...
        </div>
      </BottomModalWrapper>
    );
  }
  const isHost = user?.isLoggedIn && user?.id === localItem.hostId;

  const handleAddReply = async (text, onSuccess) => {
    const res = await api.patungan.addLog({ id: localItem.id, text });
    if (res.success) {
      setRefreshTrigger(prev => prev + 1);
      toast.success("Update status berhasil ditambahkan");
      if (onSuccess) onSuccess();
    } else {
      toast.error(res.message || "Gagal menambahkan pembaruan");
    }
  };

  const handleFinish = async () => {
    if (!proofLink || !proofLink.startsWith("http")) {
      setFinishError("Link bukti harus berupa URL yang valid (http/https)");
      return;
    }
    
    setFinishError("");
    const res = await api.patungan.finish({ id: localItem.id, proofLink });
    if (res.success || !res.message) {
      toast.success("Patungan berhasil diselesaikan!");
      setIsFinishModalOpen(false);
      setRefreshTrigger(prev => prev + 1);
    } else {
      setFinishError(res.message || "Gagal menyelesaikan patungan");
    }
  };

  const handleLogin = () => {
    toast.error(patunganData.detail.alerts.loginRequired);
    login();
  };

  const handleJoin = async (quota) => {
    const numQuota = parseInt(quota);
    if (!quota || isNaN(numQuota) || numQuota < 1) {
      toast.error("Masukkan nominal yang valid");
      return;
    }
    const remainingQuota = localItem.targetQuota - localItem.currentQuota;
    if (numQuota > remainingQuota) {
      toast.error(`Sisa kuota hanya ${remainingQuota} ${localItem.unit}`);
      return;
    }

    const res = await api.patungan.join({ id: localItem.id, quota: numQuota });
    if (res.success) {
      toast.success("Berhasil mendaftar! Menunggu persetujuan host.");
      setRefreshTrigger(prev => prev + 1);
    } else {
      toast.error(res.message || "Gagal mendaftar");
    }
  };

  return (
    <>
      <BottomModalWrapper onClose={onClose}>
        <PatunganDetail item={localItem} isLoggedIn={user?.isLoggedIn} onLogin={handleLogin} isHost={isHost} onEdit={() => setIsEditModalOpen(true)} onManage={() => setIsManageModalOpen(true)} onJoin={handleJoin} onFinish={() => setIsFinishModalOpen(true)} />
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
      {isManageModalOpen && (
        <ManageParticipantsModal
          patunganId={localItem.id}
          hostId={localItem.hostId}
          onClose={() => setIsManageModalOpen(false)}
          onUpdate={() => setRefreshTrigger(prev => prev + 1)}
        />
      )}
      {isFinishModalOpen && (
        <CenterModalWrapper title="Selesaikan Patungan" onClose={() => {
          setIsFinishModalOpen(false);
          setFinishError("");
        }}>
          <div className="p-4 sm:p-5">
            <p className="text-sm text-text-muted mb-4">
              Silakan masukkan link Google Drive yang berisi bukti patungan (foto barang, struk, dll). Link ini dapat diakses oleh partisipan patungan.
            </p>
            <div className="flex flex-col gap-2 mb-6">
              <input
                type="url"
                value={proofLink}
                onChange={(e) => setProofLink(e.target.value)}
                placeholder="https://drive.google.com/..."
                className={`w-full px-4 py-3 rounded-xl border bg-bg-surface outline-none focus:border-primary-base transition-colors ${
                  finishError ? "border-danger-base" : "border-border-base"
                }`}
              />
              {finishError && (
                <span className="text-xs text-danger-base font-medium px-1">
                  {finishError}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsFinishModalOpen(false);
                  setFinishError("");
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-border-base font-bold text-text-base hover:bg-bg-subtle transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3 px-4 rounded-xl bg-primary-base hover:bg-primary-hover text-text-inverted font-bold transition cursor-pointer shadow-lg shadow-primary-glow"
              >
                Kirim & Selesaikan
              </button>
            </div>
          </div>
        </CenterModalWrapper>
      )}
    </>
  );
}


function PatunganDetail({ item, isLoggedIn, onLogin, isHost, onEdit, onManage, onJoin, onFinish }) {
  const percent = Math.min(100, Math.round((item.currentQuota / item.targetQuota) * 100));
  const remainingQuota = item.targetQuota - item.currentQuota;
  
  const [joinQuota, setJoinQuota] = useState("");
  const isExpired = new Date(item.deadline).getTime() <= new Date().getTime();

  let waText = patunganData.detail.actions.whatsappTemplate
    .replace("{creatorName}", item.creatorName)
    .replace("{title}", item.title);
  const waLink = `https://wa.me/${item.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-primary-text">
            {item.category === "PANGAN" ? "Pangan" : item.category === "KOS" ? "Kos & Fasilitas" : item.category === "KAMPUS" ? "Kebutuhan Kampus" : item.category === "DIGITAL" ? "Layanan Digital" : item.category}
          </span>
          <div className="flex flex-col items-end">
            <span className="text-[10px] sm:text-xs font-extrabold text-danger-base tracking-wide">
              {getRelativeTime(item.deadline)}
            </span>
            {item.lastUpdated && (
              <span className="text-[10px] text-text-muted mt-0.5 font-medium">
                Pembaruan Terakhir: {getFullDateTime(item.lastUpdated)}
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
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{isLoggedIn ? item.creatorName : patunganData.detail.creator.protectedName}</span>
            {isLoggedIn && (
              <span className="text-xs font-medium text-warning-text flex items-center gap-1">
                ⭐ {item.creatorRating > 0 ? item.creatorRating.toFixed(1) : "-"} <span className="text-text-muted font-normal">({item.creatorReviewCount})</span>
              </span>
            )}
          </div>
          <span className="text-xs text-text-muted block mt-1">{getFullDateTime(item.createdAt)}</span>
        </div>
      </div>
      <div>
        {isLoggedIn ? (
          <div className="flex flex-col gap-3 w-full">
            {item.status === 'FINISHED' ? (
              <div className="w-full bg-bg-subtle border border-border-base text-success-base font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Patungan Selesai
              </div>
            ) : item.status === 'CANCELLED' ? (
              <div className="w-full bg-bg-subtle border border-danger-base text-danger-base font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
                Patungan Dibatalkan
              </div>
            ) : (
              <>
                {isHost && (
                  <>
                    <button 
                      onClick={onManage}
                      className="w-full bg-primary-base hover:bg-primary-hover text-text-inverted font-bold py-3.5 rounded-xl transition flex items-center justify-center cursor-pointer shadow-lg shadow-primary-glow"
                    >
                      {patunganData.detail.actions.manageButton}
                    </button>
                    <button 
                      onClick={onFinish}
                      className="w-full bg-success-base hover:bg-success-hover text-text-inverted font-bold py-3.5 rounded-xl transition flex items-center justify-center cursor-pointer shadow-lg shadow-success-base/20"
                    >
                      {patunganData.detail.actions.finishButton}
                    </button>
                  </>
                )}
                {!isHost && (
                  <>
                    <a href={waLink} target="_blank" rel="noreferrer" className="w-full bg-success-base hover:bg-success-hover text-text-inverted font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-success-base/20">
                      <MessageCircle className="w-5 h-5" />
                      {patunganData.detail.actions.whatsappButton}
                    </a>
                
                    {!isExpired && item.status !== 'FULL' && (
                      <div className="flex flex-col gap-1.5 mt-1">
                        <div className="flex gap-2">
                          <input 
                            type="number" 
                            value={joinQuota} 
                            onChange={e => setJoinQuota(e.target.value)} 
                            className="flex-1 px-3 py-3 text-sm font-bold rounded-xl border border-border-base bg-bg-surface outline-none focus:border-primary-base transition-colors min-w-0" 
                            placeholder={`Jml ${item.unit}`} 
                          />
                          <button 
                            onClick={() => {
                              onJoin(joinQuota);
                              setJoinQuota("");
                            }} 
                            className="bg-primary-base hover:bg-primary-hover transition text-text-inverted px-4 py-3 rounded-xl font-bold text-xs sm:text-sm cursor-pointer shadow-lg shadow-primary-glow whitespace-nowrap shrink-0"
                          >
                            {patunganData.detail.actions.joinButton}
                          </button>
                        </div>
                        <span className="text-[10px] text-text-muted text-center leading-tight">{patunganData.detail.actions.joinHelper}</span>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
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