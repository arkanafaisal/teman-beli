import { profileData } from "../../data/profile";
import { useAuth } from "../../context/AuthContext";

export default function ProfileCard() {
  const { user } = useAuth();
  const data = profileData.profileCard;

  // Use AuthContext user data if logged in, otherwise mock data
  const name = user.isLoggedIn ? user.name : data.name;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 dark:bg-blue-400/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start relative z-10">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-black shadow-lg shadow-blue-500/30 flex-shrink-0">
          {initial}
        </div>
        
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-center sm:justify-start gap-2">
            {name}
            <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              ✓ <span>{data.verification}</span>
            </span>
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">{data.department}</p>
          
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
            <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 rounded-xl text-sm font-bold border border-amber-200 dark:border-amber-900/50">
              {data.rating}
            </div>
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-bold border border-emerald-200 dark:border-emerald-900/50">
              ✓ {data.successCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
