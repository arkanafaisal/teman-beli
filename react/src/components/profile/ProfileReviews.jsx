import { useState, useEffect } from "react";
import { profileData } from "../../data/profile";
import { api } from "../../services/api";
import { Star } from "lucide-react";

export default function ProfileReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.user.getReviews().then(res => {
      if (res.success) {
        setReviews(res.payload);
      }
      setLoading(false);
    });
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            className={`w-3.5 h-3.5 ${idx < rating ? "text-warning-text fill-warning-text" : "text-border-base"}`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-bg-surface p-6 rounded-3xl border border-border-base shadow-sm">
      <h3 className="font-bold text-base text-text-heading mb-4">{profileData.reviewsCard.title}</h3>

      <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar pr-2 -mr-2">
        {loading ? (
          <p className="text-xs text-text-muted text-center py-4">Memuat ulasan...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="py-0 border-b border-border-subtle last:border-0 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-text-heading">{review.reviewer?.name} {review.reviewer?.department ? `(${review.reviewer.department})` : ''}</span>
                <span className="text-warning-text font-bold">{renderStars(review.rating)}</span>
              </div>
              <div className="flex justify-between items-start gap-2 mt-1">
                <p className="text-text-muted flex-1">{review.comment}</p>
                <span className="text-[10px] text-text-muted/60 whitespace-nowrap">{formatDate(review.createdAt)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-text-muted text-center py-4">Belum ada ulasan.</p>
        )}
      </div>
    </div>
  );
}
