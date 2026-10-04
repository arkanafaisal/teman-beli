import { profileData } from "../../data/profile";

export default function ProfileReviews() {
  const reviews = []; // API Not implemented yet

  return (
    <div className="bg-bg-surface p-6 rounded-3xl border border-border-base shadow-sm">
      <h3 className="font-bold text-base text-text-heading mb-4">{profileData.reviewsCard.title}</h3>

      <div className="space-y-4">
        {reviews.length > 0 ? reviews.map((review, idx) => (
          <div key={idx} className="py-3.5 border-b border-border-subtle last:border-0 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-text-heading">{review.name} ({review.department})</span>
              <span className="text-warning-text font-bold">{review.stars}</span>
            </div>
            <p className="text-text-muted">{review.comment}</p>
          </div>
        )) : (
          <p className="text-xs text-text-muted text-center py-4">Belum ada ulasan.</p>
        )}
      </div>
    </div>
  );
}
