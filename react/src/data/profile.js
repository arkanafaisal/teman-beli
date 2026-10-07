export const profileData = {
  profileCard: {
    initial: "A",
    name: "Amelia Salsabila",
    department: "Informatika UNS",
    verification: "Verified Email Kampus",
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
    statusOpen: "Berlangsung",
    statusFull: "Berlangsung",
    statusPending: "Mendaftar",
    statusAccepted: "Berlangsung",
    statusRejected: "Mendaftar",
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
  ratingModal: {
    title: "Detail & Penilaian",
    labelUnit: "Satuan:",
    labelTotal: "Total Terkumpul:",
    labelMyQuota: "Porsi Saya:",
    labelProof: "Lihat Bukti Selesai",
    ratingTitle: "Berikan Ulasan untuk Host",
    ratingSubtitle: "Bagaimana pengalaman patungan Anda?",
    placeholderComment: "Tulis komentar opsional tentang host atau barang...",
    submitBtn: "Kirim Ulasan",
    submittingBtn: "Mengirim...",
    alreadyReviewed: "Anda sudah memberikan ulasan.",
    ratingValueLabel: "⭐"
  },
  editProfileCard: {
    title: "Pengaturan Akun",
    departmentLabel: "Departemen / Jurusan",
    departmentPlaceholder: "Informatika UNS",
    passwordLabel: "Set / Reset Password",
    passwordPlaceholder: "Kosongi untuk tidak mengubah",
    buttonNormal: "Simpan Perubahan",
    buttonLoading: "Menyimpan...",
    deleteAccountBtn: "Hapus Akun",
    deleteModalTitle: "Konfirmasi Hapus Akun",
    deleteModalDesc: "Ketik nama Anda (<b>{name}</b>) di bawah ini untuk mengonfirmasi penghapusan",
    deleteModalPlaceholder: "Ketik nama Anda di sini",
    deleteModalConfirmBtn: "Hapus Akun",
    deleteModalLoadingBtn: "Menghapus..."
  }
};
