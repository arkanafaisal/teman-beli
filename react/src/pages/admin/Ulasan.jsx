import React from 'react';

export default function Ulasan() {
  return (
    <>
<div className="flex min-h-screen relative overflow-x-hidden">
      <div id="sidebarBackdrop"  className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 hidden lg:hidden"></div>

      {/*  SIDEBAR RESPONSIVE  */}
      <aside
        id="sidebar"
        className="fixed lg:static top-0 bottom-0 left-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/60 flex flex-col shrink-0 z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out"
      >
        {/*  Brand Admin & Tombol Close Mobile  */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">T</div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white text-base leading-none">Teman Beli</h1>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Admin Workspace</span>
            </div>
          </div>
          {/*  Tombol Close (Mobile Only)  */}
          <button  className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700">
            <i className="ph ph-x text-xl"></i>
          </button>
        </div>

        {/*  Menu Navigasi Admin  */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Utama</p>

          <a href="index.html" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 font-medium text-sm text-slate-600 dark:text-slate-300 transition">
            <i className="ph ph-squares-four text-lg"></i>
            Dashboard
          </a>

          <p className="px-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-5 mb-2">Kelola Konten</p>

          <a href="patungan.html" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 font-medium text-sm text-slate-600 dark:text-slate-300 transition">
            <i className="ph ph-handshake text-lg"></i>
            Patungan
          </a>

          <a href="pengguna.html" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 font-medium text-sm text-slate-600 dark:text-slate-300 transition">
            <i className="ph ph-users text-lg"></i>
            Pengguna
          </a>

          <a href="ulasan.html" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold text-sm transition">
            <i className="ph ph-star text-lg"></i>
            Ulasan & Rating
          </a>

          <a href="komunitas.html" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 font-medium text-sm text-slate-600 dark:text-slate-300 transition">
            <i className="ph ph-users-three text-lg"></i>
            Rekomendasi & Komunitas
          </a>
        </nav>

        {/*  Bottom Actions  */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700/60 space-y-1">
          <a href="../index.html" target="_blank" className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition">
            <i className="ph ph-arrow-square-out text-base"></i>
            Lihat Tampilan User
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition">
            <i className="ph ph-sign-out text-base"></i>
            Keluar
          </a>
        </div>
      </aside>

      {/*  MAIN CONTENT  */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60 px-4 sm:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button  className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-700"><i className="ph ph-list text-xl"></i></button>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Ulasan & Rating</h2>
              <p className="text-xs text-slate-400 hidden sm:block">Moderasi feedback dan ulasan pengguna platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button id="themeToggleBtn"  className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200"><i id="themeIcon" className="ph ph-moon text-lg sm:text-xl"></i></button>
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">BR</div>
              <span className="text-xs font-semibold hidden sm:inline">Baginda Ratu</span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-8 space-y-6 flex-1 overflow-y-auto">
          {/*  SCORE OVERVIEW CARD  */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="text-center">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">4.8</span>
                <p className="text-xs text-amber-500 font-bold mt-1">★ ★ ★ ★ ★</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Dari 458 Ulasan</p>
              </div>
              <div className="h-12 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
              <div className="text-xs space-y-1 text-slate-500 dark:text-slate-400">
                <p><span className="font-bold text-slate-900 dark:text-white">92%</span> Pengguna puas dengan kecepatan tim patungan</p>
                <p><span className="font-bold text-slate-900 dark:text-white">98%</span> Proses pembayaran terverifikasi aman</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20">Export Laporan Ulasan</button>
          </div>

          {/*  LIST ULASAN  */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">SN</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-xs">Siti Nurhaliza</p>
                    <p className="text-[10px] text-slate-400">Patungan: Spotify Family 1 Bulan • 04 Okt 2026</p>
                  </div>
                </div>
                <span className="text-amber-500 font-bold text-xs">★ ★ ★ ★ ★ (5.0)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">"Patungan Canva Pro lancar banget, prosesnya cepat dan admin fast respon! Rekomended banget buat temen-temen mahasiswa."</p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex justify-end gap-3 text-xs">
                <button className="text-blue-600 font-semibold hover:underline"><i className="ph ph-check mr-1"></i> Tampilkan di Homepage</button>
                <button className="text-rose-600 font-semibold hover:underline"><i className="ph ph-trash mr-1"></i> Sembunyikan</button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">BS</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-xs">Budi Santoso</p>
                    <p className="text-[10px] text-slate-400">Patungan: Buku Cetak Kalkulus Vol 2 • 03 Okt 2026</p>
                  </div>
                </div>
                <span className="text-amber-500 font-bold text-xs">★ ★ ★ ★ ☆ (4.0)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">"Bagus, buku fotokopian kalkulusnya rapi dan murah meriah untuk kantong mahasiswa."</p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex justify-end gap-3 text-xs">
                <button className="text-blue-600 font-semibold hover:underline"><i className="ph ph-check mr-1"></i> Tampilkan di Homepage</button>
                <button className="text-rose-600 font-semibold hover:underline"><i className="ph ph-trash mr-1"></i> Sembunyikan</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
