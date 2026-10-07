import React from 'react';

export default function Patungan() {
  return (
    <>
<div className="flex min-h-screen relative overflow-x-hidden">

    {/*  BACKDROP OVERLAY (Mobile)  */}
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
        
        <a href="index.html" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 font-medium text-sm text-slate-600 dark:text-slate-300 transition">
          <i className="ph ph-squares-four text-lg"></i>
          Dashboard
        </a>

        <p className="px-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-5 mb-2">Kelola Konten</p>

        <a href="patungan.html" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold text-sm transition">
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

    {/*  MAIN CONTENT  */}
    <div className="flex-1 flex flex-col min-w-0">
      
      {/*  TOP HEADER  */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60 px-4 sm:px-8 py-4 flex justify-between items-center transition-colors duration-200">
        <div className="flex items-center gap-3">
          <button  className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
            <i className="ph ph-list text-xl"></i>
          </button>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Kelola Project Patungan</h2>
            <p className="text-xs text-slate-400 hidden sm:block">Daftar semua listing patungan barang dan jasa</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button id="themeToggleBtn"  className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200">
            <i id="themeIcon" className="ph ph-moon text-lg sm:text-xl"></i>
          </button>
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">BR</div>
            <span className="text-xs font-semibold hidden sm:inline">Baginda Ratu</span>
          </div>
        </div>
      </header>

      {/*  CONTENT BODY  */}
      <main className="p-4 sm:p-8 space-y-6 flex-1 overflow-y-auto">

        {/*  CONTROLS & FILTER  */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold">Semua (32)</button>
            <button className="px-3.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-xl text-xs font-medium">Berjalan (24)</button>
            <button className="px-3.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-xl text-xs font-medium">Selesai/Penuh (8)</button>
          </div>

          <button  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2">
            <i className="ph ph-plus-circle text-base"></i> Buat Patungan Baru
          </button>
        </div>

        {/*  TABEL PATUNGAN  */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Nama Project Patungan</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Harga / Orang</th>
                  <th className="px-6 py-4">Progres Slot</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 dark:text-white">Spotify Family Plan (1 Bulan)</p>
                    <p className="text-[11px] text-slate-400">Penggagas: @aditya_p</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">Digital</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Rp 15.000</td>
                  <td className="px-6 py-4 w-48">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-slate-600 dark:text-slate-400">5/6 Slot</span>
                      <span className="font-bold text-blue-600">83%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[83%]"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">Berjalan</span></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition"><i className="ph ph-pencil text-lg"></i></button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 transition"><i className="ph ph-trash text-lg"></i></button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 dark:text-white">Buku Cetak Kalkulus Vol. 2 (Fotokopi)</p>
                    <p className="text-[11px] text-slate-400">Penggagas: Admin</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Buku & Tulis</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Rp 35.000</td>
                  <td className="px-6 py-4 w-48">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-slate-600 dark:text-slate-400">2/2 Slot</span>
                      <span className="font-bold text-blue-600">100%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[100%]"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">Penuh / Selesai</span></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition"><i className="ph ph-pencil text-lg"></i></button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 transition"><i className="ph ph-trash text-lg"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  </div>

  {/*  MODAL FORM TAMBAH PATUNGAN  */}
  <div id="patunganModal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
    <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5 shadow-xl">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Buat Project Patungan Baru</h3>
        <button  className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><i className="ph ph-x text-xl"></i></button>
      </div>

      <form className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Judul Patungan</label>
          <input type="text" placeholder="Contoh: Netflix Premium 4K (4 Screen)" className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Kategori</label>
            <select className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>Digital & Subscription</option>
              <option>Buku & Cetak Akademik</option>
              <option>Kebutuhan Kos</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Target Kuota Slot</label>
            <input type="number" placeholder="4" className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Harga Total (Rp)</label>
            <input type="number" placeholder="186000" className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Harga Per Orang (Rp)</label>
            <input type="number" placeholder="46500" className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <button type="button"  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">Batal</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20">Publikasikan Patungan</button>
        </div>
      </form>
    </div>
  </div>
    </>
  );
}
