import { profileData } from "../../data/profile";

export default function ProfileReviews() {
  const { title, reviews } = profileData.reviewsCard;

  return (
    <div className="bg-bg-surface p-6 rounded-3xl border border-border-base shadow-sm">
      <h3 className="font-bold text-sm text-text-heading mb-4">{title}</h3>
      
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="p-3.5 bg-bg-subtle rounded-xl text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-text-heading">{review.name} ({review.department})</span>
              <span className="text-warning-text font-bold">{review.stars}</span>
            </div>
            <p className="text-text-muted">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
