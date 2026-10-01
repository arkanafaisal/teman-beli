import { exploreData } from "../../data/explore";
import { useAuth } from "../../context/AuthContext";

export default function ExploreHeader() {
  const { user } = useAuth();
  
  const handleCreate = () => {
    if (!user.isLoggedIn) {
      alert(exploreData.alerts.loginRequired);
    } else {
      window.location.href = "/create";
    }
  };

  return (
    <div data-aos="fade-down" className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{exploreData.header.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{exploreData.header.subtitle}</p>
      </div>
      <button 
        onClick={handleCreate} 
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 group"
      >
        <span>{exploreData.header.createButton}</span>
      </button>
    </div>
  );
}
