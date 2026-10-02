import { profileData } from "../../data/profile";

export default function ProfileReviews() {
  const { title, reviews } = profileData.reviewsCard;

  return (
    <div className="bg-bg-surface rounded-3xl p-6 sm:p-8 border border-border-base shadow-sm mt-6">
      <h2 className="text-lg font-bold text-text-heading mb-5">{title}</h2>
      
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="p-4 sm:p-5 bg-bg-subtle rounded-2xl border border-border-subtle">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-bold text-sm text-text-heading">{review.name}</p>
                <p className="text-[11px] text-text-muted">{review.department}</p>
              </div>
              <div className="text-xs">{review.stars}</div>
            </div>
            <p className="text-sm text-text-muted italic">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
