import React from 'react';

export default function Komunitas() {
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

          <a href="ulasan.html" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 font-medium text-sm text-slate-600 dark:text-slate-300 transition">
            <i className="ph ph-star text-lg"></i>
            Ulasan & Rating
          </a>

          <a href="komunitas.html" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold text-sm transition">
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
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Rekomendasi & Komunitas</h2>
              <p className="text-xs text-slate-400 hidden sm:block">Kelola pin banner rekomendasi & forum diskusi antar-mahasiswa</p>
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

        <main className="p-4 sm:p-8 space-y-8 flex-1 overflow-y-auto">
          {/*  SECTION 1: REKOMENDASI TERPILIH (FEATURED ADMIN)  */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Rekomendasi Utama (Banner Depan)</h3>
                <p className="text-xs text-slate-400">Patungan yang di-pin untuk tampil di halaman utama customer</p>
              </div>
              <button className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20">+ Pin Patungan Baru</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20 flex flex-col justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase">Featured #1</span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-2">Spotify Family 1 Bulan</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Rp 15.000 / orang • Slot 5/6</p>
                </div>
                <button className="mt-4 text-xs font-semibold text-rose-600 hover:underline text-left">Lepas dari Pin Header</button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 flex flex-col justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 uppercase">Featured #2</span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-2">Patungan Printer Bersama Kos</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Rp 75.000 / orang • Slot 3/4</p>
                </div>
                <button className="mt-4 text-xs font-semibold text-rose-600 hover:underline text-left">Lepas dari Pin Header</button>
              </div>
            </div>
          </section>

          {/*  SECTION 2: GRUP DISKUSI KOMUNITAS  */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Grup Diskusi & Komunitas Kampus</h3>
                <p className="text-xs text-slate-400">Grup yang dibentuk pengguna untuk berkoordinasi</p>
              </div>
              <button className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20">+ Buat Grup Baru</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-lg"><i className="ph ph-books"></i></div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">Anak Lab Informatika UNS</h4>
                    <p className="text-[11px] text-slate-400">128 Anggota • 12 Patungan Sukses</p>
                  </div>
                </div>
                <button className="text-xs text-indigo-600 font-semibold hover:underline">Kelola Grup</button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-lg"><i className="ph ph-house-line"></i></div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">Komunitas Kos sekitar Jebres</h4>
                    <p className="text-[11px] text-slate-400">84 Anggota • 8 Patungan Sukses</p>
                  </div>
                </div>
                <button className="text-xs text-indigo-600 font-semibold hover:underline">Kelola Grup</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
    </>
  );
}
