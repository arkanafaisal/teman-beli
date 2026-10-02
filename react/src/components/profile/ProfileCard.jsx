import { profileData } from "../../data/profile";
import { useAuth } from "../../context/AuthContext";

export default function ProfileCard() {
  const { user } = useAuth();
  const data = profileData.profileCard;

  // Use AuthContext user data if logged in, otherwise mock data
  const name = user.isLoggedIn ? user.name : data.name;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="bg-bg-surface p-6 rounded-3xl border border-border-base shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-primary-base text-text-inverted font-extrabold text-xl rounded-full flex items-center justify-center shrink-0 shadow-md">
          {initial}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-text-heading truncate">{name}</h2>
          <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{data.department} &bull; {data.verification}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="text-warning-text text-base font-extrabold">
          {data.rating}
        </div>
        
        <div className="w-px h-8 bg-border-base"></div>
        
        <div className="flex flex-col text-xs font-bold text-text-muted">
          <span>{data.hostCount}x Host</span>
          <span>{data.participantCount}x Ikut</span>
        </div>
      </div>
    </div>
  );
}
