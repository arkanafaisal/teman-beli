import { useState, useEffect } from "react";
import { berandaData } from "../data/beranda";
import AOS from "aos";
import "aos/dist/aos.css";

const mockHistoryData = [
  { id: "P-001", nama: "Kertas HVS A4 80gr (100 lembar)", kategori: "📚", porsi: "5 orang", tanggal: "12 Sep 2026", hargaEceran: 50000, hargaPorsiGrosir: 28000 },
  { id: "P-002", nama: "Breadboard & Kabel Jumper Praktikum", kategori: "🧪", porsi: "3 orang", tanggal: "02 Sep 2026", hargaEceran: 70000, hargaPorsiGrosir: 35000 },
  { id: "P-003", nama: "Detergen Cair & Galon Bersama Kost", kategori: "🏠", porsi: "4 orang", tanggal: "21 Ags 2026", hargaEceran: 48000, hargaPorsiGrosir: 26000 },
  { id: "P-004", nama: "Snack Box & Teh Botol Dus-dusan", kategori: "🍿", porsi: "6 orang", tanggal: "10 Ags 2026", hargaEceran: 35000, hargaPorsiGrosir: 19000 },
  { id: "P-005", nama: "Spidol Boardmaker & Tinta Refill", kategori: "📚", porsi: "4 orang", tanggal: "28 Jul 2026", hargaEceran: 40000, hargaPorsiGrosir: 22000 },
];

export default function Beranda() {
  const [showAllHistory, setShowAllHistory] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-in-out",
    });
  }, []);

  // Compute stats
  const totalHematAcc = mockHistoryData.reduce((acc, item) => acc + (item.hargaEceran - item.hargaPorsiGrosir), 0);
  const avg = mockHistoryData.length > 0 ? Math.round(totalHematAcc / mockHistoryData.length) : 0;
  const visibleHistoryData = showAllHistory ? mockHistoryData : mockHistoryData.slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen-dvh flex flex-col justify-between pt-4 pb-8 sm:py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.100),transparent)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.950/40%),transparent)] opacity-70"></div>

        <div className="hidden sm:block"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto">
          <h1 data-aos="fade-up" data-aos-duration="1000" className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.18] mb-4 sm:mb-6">
            {berandaData.hero.titleLine1} <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"> 
              {berandaData.hero.titleLine2} 
            </span>
          </h1>

          <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0">
            {berandaData.hero.subtitle}
          </p>

          <div data-aos="zoom-in" data-aos-delay="400" className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full px-2 sm:px-0">
            <a
              href="/eksplor"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>{berandaData.hero.primaryButton}</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
            <a
              href="#history-hemat"
              className="w-full sm:w-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-6 py-3.5 rounded-2xl transition text-center shadow-sm active:scale-95"
            >
              {berandaData.hero.secondaryButton}
            </a>
          </div>
        </div>

        {/* Stat Counter */}
        <div data-aos="fade-up" data-aos-delay="600" className="max-w-3xl mx-auto px-4 w-full mt-6 sm:mt-12">
          <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 text-center">
            {berandaData.stats.map((stat, idx) => (
              <div key={idx} className="p-2 sm:p-0">
                <p className="text-xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 sm:mt-1 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategori Populer Section */}
      <section id="kategori" className="py-12 sm:py-16 bg-white dark:bg-slate-800/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">{berandaData.kategori.tag}</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{berandaData.kategori.title}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {berandaData.kategori.items.map((cat, idx) => (
              <div key={idx} data-aos="zoom-in" data-aos-delay={(idx + 1) * 100} className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 text-center hover:border-blue-500 transition active:scale-95">
                <span className="text-2xl sm:text-3xl block mb-2">{cat.icon}</span>
                <h3 className="font-bold text-xs sm:text-sm mb-1 text-slate-900 dark:text-white">{cat.title}</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-tight">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur Utama Section */}
      <section id="fitur" className="py-12 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">{berandaData.fitur.tag}</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{berandaData.fitur.title}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {berandaData.fitur.items.map((feature, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 100}
                className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-700/60 hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6 font-bold">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracker Penghematan Section */}
      <section id="history-hemat" className="py-12 sm:py-16 bg-slate-100 dark:bg-slate-800/60 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div data-aos="fade-up" className="text-center mb-8 sm:mb-10">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">{berandaData.history.tag}</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{berandaData.history.title}</p>
          </div>

          <div data-aos="zoom-in" className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-start">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">{berandaData.history.summaryTitle}</span>
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-semibold text-white">{berandaData.history.summaryBadge}</span>
                </div>
                <p className="text-3xl sm:text-4xl font-black mt-3 mb-1">Rp {totalHematAcc.toLocaleString("id-ID")}</p>
                <p className="text-xs text-blue-100">Dari {mockHistoryData.length}x transaksi patungan selesai</p>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-400/30 flex items-center justify-between text-xs">
                <span className="text-blue-200">{berandaData.history.avgText}</span>
                <span className="font-extrabold text-emerald-300">~Rp {avg.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="md:col-span-2 bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-700/60">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{berandaData.history.listTitle}</span>
                </h3>
                <span className="text-[10px] sm:text-xs px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold rounded-full">{berandaData.history.listBadge}</span>
              </div>

              <div className="space-y-3">
                {visibleHistoryData.map((item) => {
                  const hematItem = item.hargaEceran - item.hargaPorsiGrosir;
                  const persenItem = Math.round((hematItem / item.hargaEceran) * 100);
                  
                  return (
                    <div key={item.id} className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex gap-2.5 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-sm sm:text-base border border-slate-100 dark:border-slate-700">
                            {item.kategori}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">{item.nama}</h4>
                            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">Patungan {item.porsi} &bull; {item.tanggal}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-extrabold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">+Rp {hematItem.toLocaleString("id-ID")}</p>
                          <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded flex inline-flex items-center gap-0.5 mt-1">
                            Hemat {persenItem}%
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {mockHistoryData.length > 3 && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50 text-center">
                  <button 
                    onClick={() => setShowAllHistory(!showAllHistory)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition inline-flex items-center gap-1 active:scale-95"
                  >
                    <span>{showAllHistory ? berandaData.history.btnShowLess : berandaData.history.btnShowMore}</span>
                    <span className={`transition-transform duration-200 ${showAllHistory ? 'rotate-180' : ''}`}>&darr;</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimoni Section */}
      <section id="testimoni" className="py-12 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">{berandaData.testimoni.tag}</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{berandaData.testimoni.title}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {berandaData.testimoni.items.map((testi, idx) => (
              <div key={idx} data-aos="fade-up" data-aos-delay={(idx + 1) * 100} className="p-5 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 italic leading-relaxed">"{testi.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm text-white ${idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                    {testi.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm">{testi.name}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-400">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-16 bg-white dark:bg-slate-800/40 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div data-aos="fade-up" className="text-center mb-8 sm:mb-12">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">{berandaData.faq.tag}</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{berandaData.faq.title}</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {berandaData.faq.items.map((item, idx) => (
              <details
                key={idx}
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 100}
                className="group p-4 sm:p-5 bg-slate-50 dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
                  <span>{item.q}</span>
                  <span className="transition group-open:rotate-180 text-blue-600 dark:text-blue-400 ml-2">&darr;</span>
                </summary>
                <p className="mt-2.5 sm:mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 my-10 sm:my-16">
        <div data-aos="zoom-in" className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-white text-center shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 tracking-tight">{berandaData.cta.title}</h2>
            <p className="text-blue-100 text-xs sm:text-base mb-6 sm:mb-8 leading-relaxed">{berandaData.cta.subtitle}</p>
            <a
              href="/eksplor"
              className="inline-block bg-white hover:bg-blue-50 text-blue-700 font-extrabold px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:scale-105 transition transform active:scale-95 text-sm sm:text-base"
            >
              {berandaData.cta.button} &rarr;
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
