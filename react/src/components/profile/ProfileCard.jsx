import { profileData } from "../../data/profile";
import { useAuth } from "../../context/AuthContext";

export default function ProfileCard() {
  const { user } = useAuth();
  const data = profileData.profileCard;

  // Use AuthContext user data if logged in, otherwise mock data
  const name = user.isLoggedIn ? user.name : data.name;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="bg-bg-surface p-6 rounded-3xl border border-border-base shadow-sm text-center">
      <div className="w-20 h-20 bg-primary-base text-text-inverted font-extrabold text-2xl rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
        {initial}
      </div>
      <h2 className="text-xl font-bold text-text-heading">{name}</h2>
      <p className="text-xs text-text-muted mt-1">{data.department} &bull; {data.verification}</p>

      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-warning-soft border border-warning-soft/50 rounded-full text-warning-text text-xs font-bold mt-4">
        <span>{data.rating}</span>
        <span>&bull;</span>
        <span>{data.successCount}</span>
      </div>
    </div>
  );
}
