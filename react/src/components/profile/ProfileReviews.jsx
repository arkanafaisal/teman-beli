import { profileData } from "../../data/profile";

export default function ProfileReviews() {
  const { title, reviews } = profileData.reviewsCard;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm mt-6">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">{title}</h2>
      
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700/80">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">{review.name}</p>
                <p className="text-[11px] text-slate-400">{review.department}</p>
              </div>
              <div className="text-xs">{review.stars}</div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
