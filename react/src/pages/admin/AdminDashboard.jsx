import React from 'react';

export default function AdminDashboard() {
  return (
    <>
<div className="flex min-h-screen relative overflow-x-hidden">

    {/*  BACKDROP OVERLAY (Untuk Mobile Saat Sidebar Terbuka)  */}
    <div id="sidebarBackdrop"  className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 hidden lg:hidden transition-opacity duration-300"></div>

    {/*  SIDEBAR RESPONSIVE  */}
    <aside id="sidebar" className="fixed lg:static top-0 bottom-0 left-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/60 flex flex-col shrink-0 z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out">
      
      {/*  Brand Admin & Tombol Close Mobile  */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
            T
          </div>
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
        
        <a href="index.html" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold text-sm transition">
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

    {/*  MAIN CONTENT AREA  */}
    <div className="flex-1 flex flex-col min-w-0">

      {/*  TOP HEADER  */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60 px-4 sm:px-8 py-4 flex justify-between items-center transition-colors duration-200">
        
        <div className="flex items-center gap-3">
          {/*  HAMBURGER BUTTON (Tampil di Mobile & Tablet)  */}
          <button  className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:ring-2 hover:ring-blue-500/50 transition">
            <i className="ph ph-list text-xl"></i>
          </button>
          
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Panel Administrasi</h2>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-5">
          {/*  Dark / Light Mode Toggle Button  */}
          <button id="themeToggleBtn"  className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:ring-2 hover:ring-blue-500/50 transition">
            <i id="themeIcon" className="ph ph-moon text-lg sm:text-xl"></i>
          </button>

          {/*  Profil Admin  */}
          <div className="flex items-center gap-3 pl-3 sm:pl-4 border-l border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs sm:text-sm">
              BR
            </div>
            <div className="text-xs hidden sm:block">
              <p className="font-semibold text-slate-800 dark:text-slate-200">Baginda Ratu</p>
              <p className="text-slate-400">Super Admin</p>
            </div>
          </div>
        </div>
      </header>

      {/*  MAIN CONTAINER CONTENT  */}
      <main className="p-4 sm:p-8 space-y-8 flex-1 overflow-y-auto">

        {/*  RINGKASAN STATISTIK  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Patungan Aktif</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">32 Projek</h3>
              <span className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
                8 Kategori
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl">
              <i className="ph ph-handshake"></i>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Pengguna</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1,240</h3>
              <span className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
                +12 Mahasiswa/hari
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl">
              <i className="ph ph-users font-bold"></i>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Ulasan</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">458</h3>
              <span className="inline-flex items-center text-xs font-medium text-amber-500 mt-1">
                ★ 4.8 / 5.0 Rata-rata
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl">
              <i className="ph ph-star"></i>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Komunitas</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">14 Grup</h3>
              <span className="inline-flex items-center text-xs font-medium text-purple-600 dark:text-purple-400 mt-1">
                Aktif Diskusi
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl">
              <i className="ph ph-users-three"></i>
            </div>
          </div>
        </div>

        {/*  MANAJEMEN PATUNGAN & KATEGORI  */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">Patungan Aktif & Kategori</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pantau progres ketersediaan slot patungan</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 transition self-start sm:self-auto">
              + Tambah Patungan Baru
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Item / Produk</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Target Slot</th>
                  <th className="px-4 py-3">Progress</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Spotify Family 1 Bulan</td>
                  <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">Digital</span></td>
                  <td className="px-4 py-3">5 / 6 Orang</td>
                  <td className="px-4 py-3 w-48">
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[83%]"></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Buku Cetak Kalkulus Vol. 2</td>
                  <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Buku & Tulis</span></td>
                  <td className="px-4 py-3">2 / 2 Orang</td>
                  <td className="px-4 py-3">
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[100%]"></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>

  </div>

  {/*  SCRIPT RESPONSIVE SIDEBAR & DARK MODE  */}
    </>
  );
}
