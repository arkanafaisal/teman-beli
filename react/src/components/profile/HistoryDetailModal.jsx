import { useState } from "react";
import { profileData } from "../../data/profile";
import { api } from "../../services/api";
import { X, Star, ExternalLink } from "lucide-react";
import { getCategoryIcon } from "../../utils/iconMapper";
import { toast } from "sonner";

export default function HistoryDetailModal({ isOpen, onClose, activity, onReviewed }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !activity) return null;

  const modalData = profileData.ratingModal;
  const isHost = activity.type === "HOST";
  const canRate = !isHost && activity.status === "FINISHED" && !activity.isReviewed;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Silakan berikan bintang terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    const res = await api.patungan.addReview(activity.patunganId, { rating, comment });
    setIsLoading(false);

    if (res.success) {
      toast.success(res.message);
      onReviewed(activity.id);
      onClose();
    } else {
      toast.error(res.message || "Terjadi kesalahan.");
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-text-heading/40 z-40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg-surface rounded-t-3xl shadow-xl transform transition-transform border-t border-border-base w-full max-w-md mx-auto h-auto max-h-[90vh] flex flex-col">
        {/* Handle bar for dragging (visual only) */}
        <div className="w-full flex justify-center pt-3 pb-2" onClick={onClose}>
          <div className="w-12 h-1.5 bg-border-base rounded-full"></div>
        </div>

        <div className="px-6 pb-4 border-b border-border-subtle flex justify-between items-center shrink-0">
          <h2 className="text-lg font-bold text-text-heading">{modalData.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-bg-subtle text-text-muted transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {/* Core Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isHost ? 'bg-primary-soft text-primary-base' : 'bg-success-soft text-success-text'}`}>
              {getCategoryIcon(activity.category, "w-6 h-6")}
            </div>
            <div>
              <h3 className="font-bold text-base text-text-heading leading-tight">{activity.title}</h3>
              <p className="text-xs text-text-muted mt-1 font-bold">
                Rp {activity.unitPrice?.toLocaleString('id-ID')} / {activity.unit}
              </p>
            </div>
          </div>

          <div className="bg-bg-subtle rounded-xl p-4 mb-6 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">{modalData.labelTotal}</span>
              <span className="font-bold text-text-heading">Rp {activity.totalPrice?.toLocaleString('id-ID')} ({activity.targetQuota} {activity.unit})</span>
            </div>
            {!isHost && activity.quota && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">{modalData.labelMyQuota}</span>
                <span className="font-bold text-primary-base">{activity.quota} {activity.unit}</span>
              </div>
            )}
          </div>

          {/* Proof Link */}
          {activity.status === "FINISHED" && activity.proofLink && (
            <a
              href={activity.proofLink}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-border-base hover:bg-border-subtle text-text-heading font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 mb-6"
            >
              <ExternalLink className="w-4 h-4" />
              {modalData.labelProof}
            </a>
          )}

          {/* Rating Section */}
          {!isHost && activity.status === "FINISHED" && (
            <div className="pt-2 border-t border-border-subtle">
              {activity.isReviewed ? (
                <div className="bg-success-soft text-success-text p-4 rounded-xl text-center text-sm font-bold mt-4">
                  {modalData.alreadyReviewed}
                </div>
              ) : (
                <div className="mt-4">
                  <h4 className="font-bold text-text-heading text-center mb-1">{modalData.ratingTitle}</h4>
                  <p className="text-xs text-text-muted text-center mb-4">{modalData.ratingSubtitle}</p>

                  <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`transition-transform hover:scale-110 p-1 ${rating >= star ? "text-warning-text" : "text-border-base"
                          }`}
                      >
                        <Star className="w-8 h-8" fill={rating >= star ? "currentColor" : "none"} strokeWidth={rating >= star ? 0 : 2} />
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={modalData.placeholderComment}
                    className="w-full bg-bg-surface border border-border-base rounded-xl p-3 text-sm text-text-heading outline-none focus:border-primary-base transition-colors resize-none mb-4"
                    rows={3}
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || rating === 0}
                    className="w-full bg-primary-base hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-text-inverted font-bold py-3.5 rounded-xl transition shadow-lg shadow-primary-glow"
                  >
                    {isLoading ? modalData.submittingBtn : modalData.submitBtn}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
