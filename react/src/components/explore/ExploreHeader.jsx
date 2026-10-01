import { exploreData } from "../../data/explore";

export default function ExploreHeader() {
  const handleCreate = () => {
    // Check login state (mock for now)
    const isLoggedIn = false; 
    if (!isLoggedIn) {
      alert(exploreData.alerts.loginRequired);
      // In real app, redirect to login or SSO
    } else {
      window.location.href = "/create";
    }
  };

  return (
    <section className="pt-8 sm:pt-12 pb-6 sm:pb-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div data-aos="fade-right">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">{exploreData.header.title}</h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">{exploreData.header.subtitle}</p>
        </div>
        <button
          onClick={handleCreate}
          data-aos="fade-left"
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition active:scale-95 whitespace-nowrap"
        >
          {exploreData.header.createButton}
        </button>
      </div>
    </section>
  );
}
