export const berandaData = {
  hero: {
    titleLine1: "Beli Grosir Lebih Hemat,",
    titleLine2: "Bayar Sesuai Porsi Kamu.",
    subtitle: "Solusi patungan belanja kertas HVS, bahan praktikum, alat lukis, hingga kebutuhan kost khusus sesama mahasiswa kampus. Otomatis, terverifikasi, dan transparan.",
    primaryButton: "Jelajahi Patungan",
    secondaryButton: "Rekap Penghematan"
  },
  stats: [
    { value: "100%", label: "Verified Mahasiswa" },
    { value: "Rp 0", label: "Biaya Admin Platform" },
    { value: "Otomatis", label: "Kalkulasi Satuan" }
  ],
  kategori: {
    tag: "Pilihan Hemat",
    title: "Kategori Patungan Populer",
    items: [
      { icon: "📚", title: "Alat Tulis & Cetak", desc: "Kertas HVS, Jilid, Banner" },
      { icon: "🧪", title: "Bahan Praktikum", desc: "Komponen Elektro, Kimia" },
      { icon: "🍿", title: "Snack Grosir", desc: "Snack Box, Minuman Dus" },
      { icon: "🏠", title: "Kebutuhan Kost", desc: "Detergen, Galon Bersama" }
    ]
  },
  fitur: {
    tag: "Keunggulan Platform",
    title: "Dirancang Khusus untuk Ekosistem Kampus",
    items: [
      { 
        icon: "🛡️", 
        title: "Keamanan SSO Kampus", 
        desc: "Hanya akun verified email kampus yang dapat membuat pengumuman patungan. Mencegah potensi penipuan dari pihak luar." 
      },
      { 
        icon: "🧮", 
        title: "Sistem Hitung Otomatis", 
        desc: "Kreator cukup masukkan total harga dan kuota target, sistem otomatis membagi estimasi harga per satuan secara presisi." 
      },
      { 
        icon: "📍", 
        title: "Titik Kumpul Kampus", 
        desc: "Pilih lokasi serah terima di area favorit kampus (Kantin, Perpustakaan, atau Gedung Fakultas) yang praktis dijangkau." 
      }
    ]
  },
  history: {
    tag: "Dampak Nyata TemanBeli",
    title: "Rekap & History Penghematan",
    summaryTitle: "Total Uang Dihemat",
    summaryBadge: "Otomatis",
    avgText: "Rata-rata hemat / transaksi:",
    listTitle: "History Patungan Selesai",
    listBadge: "Terverifikasi",
    btnShowMore: "Lihat Lebih Banyak",
    btnShowLess: "Tampilkan Lebih Sedikit",
    isMock: true,
    mockData: [
      { id: "P-001", nama: "Kertas HVS A4 80gr (100 lembar)", kategori: "📚", porsi: "5 orang", tanggal: "12 Sep 2026", hargaEceran: 50000, hargaPorsiGrosir: 28000 },
      { id: "P-002", nama: "Breadboard & Kabel Jumper Praktikum", kategori: "🧪", porsi: "3 orang", tanggal: "02 Sep 2026", hargaEceran: 70000, hargaPorsiGrosir: 35000 },
      { id: "P-003", nama: "Detergen Cair & Galon Bersama Kost", kategori: "🏠", porsi: "4 orang", tanggal: "21 Ags 2026", hargaEceran: 48000, hargaPorsiGrosir: 26000 },
      { id: "P-004", nama: "Snack Box & Teh Botol Dus-dusan", kategori: "🍿", porsi: "6 orang", tanggal: "10 Ags 2026", hargaEceran: 35000, hargaPorsiGrosir: 19000 },
      { id: "P-005", nama: "Spidol Boardmaker & Tinta Refill", kategori: "📚", porsi: "4 orang", tanggal: "28 Jul 2026", hargaEceran: 40000, hargaPorsiGrosir: 22000 },
    ]
  },
  testimoni: {
    tag: "Pendapat Mereka",
    title: "Kata Teman Mahasiswa",
    items: [
      {
        quote: "Beli kertas HVS 1 rim kemahalan kalo dipake sendiri. Berkat TemanBeli bisa dapet porsi 100 lembar doang dengan harga pas!",
        avatar: "A",
        name: "Amelia S.",
        role: "Informatika UNS"
      },
      {
        quote: "Paling seneng karena login-nya pake SSO Kampus, jadi ga takut ditipu anak luar pas transaksi patungan praktikum.",
        avatar: "R",
        name: "Rian F.",
        role: "Teknik Elektro"
      },
      {
        quote: "Langsung terhubung ke WA Kreator tanpa ribet. Janjian tikum di Kantin FITDS langsung beres jam itu juga.",
        avatar: "D",
        name: "Dinda A.",
        role: "Desain Komunikasi Visual"
      }
    ]
  },
  faq: {
    tag: "Pertanyaan Umum",
    title: "FAQ TemanBeli",
    items: [
      {
        q: "Apakah Guest (tanpa login) bisa melihat pengumuman?",
        a: "Bisa! Guest bisa melihat feed dan detail estimasi harga. Namun untuk melihat kontak Kreator dan ikut patungan, pengguna diwajibkan login SSO Kampus."
      },
      {
        q: "Bagaimana metode pembayarannya?",
        a: "Pembayaran dilakukan secara langsung antara Partisipan dan Kreator (via Transfer Bank/E-Wallet/Tunai saat serah terima) sesuai kesepakatan obrolan WhatsApp."
      },
      {
        q: "Apakah ada biaya admin platform?",
        a: "Tidak ada! TemanBeli 100% gratis digunakan untuk mendukung ekosistem hemat antar mahasiswa kampus."
      }
    ]
  },
  cta: {
    title: "Siap Hemat Bersama Teman Kampus?",
    subtitle: "Mulai cari barang patungan aktif sekarang atau posting barang grosir yang ingin kamu beli!",
    button: "Masuk Katalog Patungan"
  },
  footer: {
    copyright: "© 2026 TemanBeli. Built for Closed Campus Ecosystem.",
    links: [
      { label: "Eksplor Feed", href: "/eksplor" },
      { label: "Fitur", href: "#fitur" },
      { label: "FAQ", href: "#faq" }
    ]
  }
};
