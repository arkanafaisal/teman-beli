import { useState, useEffect } from "react";
import { profileData } from "../../data/profile";
import { api } from "../../services/api";
import { Star, ExternalLink } from "lucide-react";
import { getCategoryIcon } from "../../utils/iconMapper";
import { toast } from "sonner";
import BottomModalWrapper from "../common/BottomModalWrapper";

export default function HistoryDetailModal({ isOpen, onClose, activity, onReviewed }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setComment("");
      setIsLoading(false);
    }
  }, [isOpen, activity]);

  if (!isOpen || !activity) return null;

  const modalData = profileData.ratingModal;
  const isHost = activity.type === "HOST";
  const isFinishedForParticipant = !isHost && activity.patunganStatus === "FINISHED" && activity.participantStatus === "ACCEPTED";
  const showProofLink = activity.patunganStatus === "FINISHED" && activity.proofLink;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error(profileData.alerts.needStars);
      return;
    }

    setIsLoading(true);
    const res = await api.patungan.addReview({ id: activity.patunganId, rating, comment });
    setIsLoading(false);

    if (res.success) {
      toast.success(res.message);
      onReviewed(activity.id, { rating, comment });
      onClose();
    } else {
      toast.error(res.message);
    }
  };

  const renderStars = (currentRating, max = 5, onStarClick = null) => {
    return (
      <div className="flex justify-center gap-2 mb-6">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            onClick={() => onStarClick && onStarClick(star)}
            disabled={!onStarClick}
            className={`transition-transform ${onStarClick ? 'hover:scale-110 p-1' : ''} ${currentRating >= star ? "text-warning-text" : "text-border-base"}`}
          >
            <Star className="w-8 h-8" fill={currentRating >= star ? "currentColor" : "none"} strokeWidth={currentRating >= star ? 0 : 2} />
          </button>
        ))}
      </div>
    );
  };

  return (
    <BottomModalWrapper onClose={onClose}>
      <h2 className="text-lg font-bold text-text-heading text-center border-b border-border-subtle pb-4 -mt-2">{modalData.title}</h2>
      
      {/* Core Info */}
      <div className="flex items-center gap-4 mb-2 mt-4">
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

      <div className="bg-bg-subtle rounded-xl p-4 mb-2 space-y-3">
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
      {showProofLink && (
        <a
          href={activity.proofLink}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-border-base hover:bg-border-subtle text-text-heading font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 mb-2"
        >
          <ExternalLink className="w-4 h-4" />
          {modalData.labelProof}
        </a>
      )}

      {/* Rating Section */}
      {isFinishedForParticipant && (
        <div className="pt-4 border-t border-border-subtle mt-4">
          {activity.isReviewed ? (
            <div className="mt-2">
              <h4 className="font-bold text-text-heading text-center mb-1">Ulasan Anda</h4>
              {activity.myReview ? (
                <>
                  <div className="mt-4">
                    {renderStars(activity.myReview.rating)}
                  </div>
                  {activity.myReview.comment && (
                    <p className="text-sm text-text-muted text-center italic bg-bg-surface p-3 rounded-xl border border-border-subtle">
                      "{activity.myReview.comment}"
                    </p>
                  )}
                </>
              ) : (
                <div className="bg-success-soft text-success-text p-4 rounded-xl text-center text-sm font-bold mt-4">
                  {modalData.alreadyReviewed}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-2">
              <h4 className="font-bold text-text-heading text-center mb-1">{modalData.ratingTitle}</h4>
              <p className="text-xs text-text-muted text-center mb-4">{modalData.ratingSubtitle}</p>

              {renderStars(rating, 5, setRating)}

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
    </BottomModalWrapper>
  );
}
