import React from 'react';

export default function Pengguna() {
  return (
    <>
<div className="flex min-h-screen relative overflow-x-hidden">
      {/*  BACKDROP OVERLAY  */}
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

          <a href="pengguna.html" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold text-sm transition">
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

      {/*  MAIN CONTENT  */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60 px-4 sm:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button  className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-700"><i className="ph ph-list text-xl"></i></button>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Manajemen Pengguna</h2>
              <p className="text-xs text-slate-400 hidden sm:block">Kelola akun pengguna registered & verifikasi identitas</p>
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
          {/*  FILTER & SEARCH  */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            <div className="relative w-full sm:w-80">
              <i className="ph ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Cari nama, NIM, email, atau jurusan..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold">Semua (1,240)</button>
              <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-medium">Pending Verification (12)</button>
            </div>
          </div>

          {/*  TABEL PENGGUNA  */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Pengguna</th>
                    <th className="px-6 py-4">Program / Institusi</th>
                    <th className="px-6 py-4">Total Patungan</th>
                    <th className="px-6 py-4">Status KTM</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs">AP</div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">Aditya Pratama</p>
                        <p className="text-[11px] text-slate-400">aditya@student.uns.ac.id</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-xs">Informatika • UNS</td>
                    <td className="px-6 py-4 font-semibold">8 Ikut</td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">Terverifikasi</span></td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Detail</button>
                      <button className="text-xs text-rose-600 font-semibold hover:underline">Suspend</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs">TR</div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">Tazkia Ramadhani</p>
                        <p className="text-[11px] text-slate-400">tazkia@student.uns.ac.id</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-xs">Teknik Industri • UNS</td>
                    <td className="px-6 py-4 font-semibold">5 Ikut</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Menunggu Verifikasi</span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="text-xs text-blue-600 font-semibold hover:underline">Verifikasi KTM</button>
                      <button className="text-xs text-slate-400 font-semibold hover:underline">Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
