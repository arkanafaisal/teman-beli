export const homeData = {
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
  categories: {
    tag: "Pilihan Hemat",
    title: "Kategori Patungan Populer",
    items: [
      { icon: "📚", title: "Alat Tulis & Cetak", desc: "Kertas HVS, Jilid, Banner" },
      { icon: "🧪", title: "Bahan Praktikum", desc: "Komponen Elektro, Kimia" },
      { icon: "🍿", title: "Snack Grosir", desc: "Snack Box, Minuman Dus" },
      { icon: "🏠", title: "Kebutuhan Kost", desc: "Detergen, Galon Bersama" }
    ]
  },
  features: {
    tag: "Keunggulan Platform",
    title: "Dirancang Khusus untuk Ekosistem Kampus",
    items: [
      { 
        icon: "🛡️", 
        title: "Keamanan Email Kampus", 
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
      { id: "P-001", name: "Kertas HVS A4 80gr (100 lembar)", category: "📚", portion: "5 orang", date: "12 Sep 2026", retailPrice: 50000, wholesalePricePerPortion: 28000 },
      { id: "P-002", name: "Breadboard & Kabel Jumper Praktikum", category: "🧪", portion: "3 orang", date: "02 Sep 2026", retailPrice: 70000, wholesalePricePerPortion: 35000 },
      { id: "P-003", name: "Detergen Cair & Galon Bersama Kost", category: "🏠", portion: "4 orang", date: "21 Ags 2026", retailPrice: 48000, wholesalePricePerPortion: 26000 },
      { id: "P-004", name: "Snack Box & Teh Botol Dus-dusan", category: "🍿", portion: "6 orang", date: "10 Ags 2026", retailPrice: 35000, wholesalePricePerPortion: 19000 },
      { id: "P-005", name: "Spidol Boardmaker & Tinta Refill", category: "📚", portion: "4 orang", date: "28 Jul 2026", retailPrice: 40000, wholesalePricePerPortion: 22000 },
    ]
  },
  testimonials: {
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
        quote: "Paling seneng karena login-nya pake email kampus, jadi ga takut ditipu anak luar pas transaksi patungan praktikum.",
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
        a: "Bisa! Guest bisa melihat feed dan detail estimasi harga. Namun untuk melihat kontak Kreator dan ikut patungan, pengguna diwajibkan login dengan email kampus."
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
      { label: "Katalog Patungan", href: "/patungan" },
      { label: "Fitur", href: "#fitur" },
      { label: "FAQ", href: "#faq" }
    ]
  }
};
