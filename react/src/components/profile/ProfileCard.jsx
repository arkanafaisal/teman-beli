import { profileData } from "../../data/profile";
import { useAuth } from "../../context/AuthContext";

export default function ProfileCard() {
  const { user } = useAuth();
  const data = profileData.profileCard;

  // Use AuthContext user data if logged in, otherwise mock data
  const name = user.isLoggedIn ? user.name : data.name;
  const initial = name.charAt(0).toUpperCase();

  const getDynamicFontSize = (text) => {
    const len = text.length;
    if (len > 25) return "text-sm sm:text-base";
    if (len > 15) return "text-base sm:text-lg";
    return "text-lg sm:text-xl";
  };

  return (
    <div className="bg-bg-surface p-6 rounded-3xl border border-border-base shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-primary-base text-text-inverted font-extrabold text-xl rounded-full flex items-center justify-center shrink-0 shadow-md">
          {initial}
        </div>
        <div className="min-w-0">
          <h2 className={`font-bold text-text-heading truncate ${getDynamicFontSize(name)}`}>{name}</h2>
          <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{user.isLoggedIn ? user.email : data.department}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="text-warning-text text-base font-extrabold flex gap-1 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-warning-text" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          {user.isLoggedIn && user.rating !== undefined ? parseFloat(user.rating).toFixed(1) : data.rating}
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
