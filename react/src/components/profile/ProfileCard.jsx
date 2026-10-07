import { profileData } from "../../data/profile";
import { useAuth } from "../../context/AuthContext";
import LetterAvatar from "../common/LetterAvatar";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Star } from "lucide-react";

export default function ProfileCard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState({ hosted: 0, joined: 0 });

  useEffect(() => {
    if (user.isLoggedIn) {
      api.history.getSummary().then(res => {
        if (res.success) {
          setSummary(res.payload);
        }
      });
    }
  }, [user.isLoggedIn]);
  const data = profileData.profileCard;

  // Use AuthContext user data if logged in, otherwise mock data
  const name = user.isLoggedIn ? user.name : data.name;

  const getDynamicFontSize = (text) => {
    const len = text.length;
    if (len > 25) return "text-sm sm:text-base";
    if (len > 15) return "text-base sm:text-lg";
    return "text-lg sm:text-xl";
  };

  return (
    <div className="bg-bg-surface p-6 rounded-3xl border border-border-base shadow-sm">
      <div className="flex items-center gap-4">
        <LetterAvatar name={name} sizeClasses="w-14 h-14 text-xl" />
        <div className="min-w-0">
          <h2 className={`font-bold text-text-heading truncate ${getDynamicFontSize(name)}`}>{name}</h2>
          <p className="text-xs text-text-muted mt-0.5 truncate">{user.isLoggedIn ? user.email : data.department}</p>
          {user.isLoggedIn && user.department && (
            <p className="text-xs text-primary-text font-bold mt-0.5 truncate">{user.department}</p>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="text-warning-text text-base font-extrabold flex gap-1 items-center">
          <Star className="w-4 h-4 fill-warning-text text-warning-text" />
          {user.isLoggedIn && user.rating !== undefined ? parseFloat(user.rating).toFixed(1) : "4.9"} / 5.0
        </div>
        
        <div className="w-px h-8 bg-border-base"></div>
        
        <div className="flex flex-col text-xs font-bold text-text-muted">
          <span>{summary.hosted}{data.hostLabel}</span>
          <span>{summary.joined}{data.joinLabel}</span>
        </div>
      </div>
    </div>
  );
}
