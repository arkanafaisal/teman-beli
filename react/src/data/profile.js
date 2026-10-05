export const profileData = {
  profileCard: {
    initial: "A",
    name: "Amelia Salsabila",
    department: "Informatika UNS",
    verification: "Verified SSO Kampus",
    rating: "⭐ 4.9 / 5.0",
    hostLabel: "x Host",
    joinLabel: "x Ikut"
  },
  reviewsCard: {
    title: "Ulasan dari Teman Kampus",
    reviews: [
      {
        name: "Rian F.",
        department: "Teknik Elektro",
        stars: "⭐⭐⭐⭐⭐",
        comment: "\"Amelia orangnya tepat waktu banget pas diajak COD kertas HVS di Kantin FITDS. Mantap!\""
      },
      {
        name: "Dinda A.",
        department: "DKV",
        stars: "⭐⭐⭐⭐⭐",
        comment: "\"Respon cepat di WA dan pembagian uang patungannya transparan banget. Recommended kawan patungan!\""
      }
    ]
  },
  historyCard: {
    title: "Riwayat Aktivitas",
    subtitle: "Daftar patungan dan transaksi terkini",
    loadingText: "Memuat riwayat...",
    emptyText: "Belum ada riwayat patungan.",
    statusFinished: "Selesai",
    statusCancelled: "Dibatalkan",
    roleHost: "Host",
    roleJoin: "Ikut",
    activities: [
      {
        id: "act-1",
        icon: "📦",
        iconBg: "bg-success-soft",
        iconColor: "text-success-text",
        title: "Patungan Kertas HVS A4 80gr",
        date: "24 Sep 2026",
        amount: "Rp 12.500"
      },
      {
        id: "act-2",
        icon: "🎧",
        iconBg: "bg-primary-soft",
        iconColor: "text-primary-text",
        title: "Akun Premium Spotify Family (Bulan Ke-3)",
        date: "18 Sep 2026",
        amount: "Rp 16.000"
      },
      {
        id: "act-3",
        icon: "☕",
        iconBg: "bg-warning-soft",
        iconColor: "text-warning-text",
        title: "Promo Beli 2 Gratis 1 Es Kopi Kantin",
        date: "10 Sep 2026",
        amount: "Rp 8.000"
      },
      {
        id: "act-4",
        icon: "📚",
        iconBg: "bg-primary-soft",
        iconColor: "text-primary-text",
        title: "Print Buku Panduan Lab Informatika",
        date: "02 Sep 2026",
        amount: "Rp 15.000"
      }
    ]
  },
  passwordCard: {
    title: "Atur Password Login",
    description: "Atur password jika Anda ingin login manual menggunakan email .ac.id tanpa melalui tombol Google.",
    newPasswordLabel: "Password Baru",
    newPasswordPlaceholder: "Minimal 6 karakter",
    confirmPasswordLabel: "Konfirmasi Password",
    confirmPasswordPlaceholder: "Ketik ulang password baru",
    buttonNormal: "Simpan Password",
    buttonLoading: "Menyimpan..."
  }
};
