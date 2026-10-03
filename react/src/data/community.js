export const communityData = {
  header: {
    title: "Info Kampus & Direktori Komunitas",
    subtitle: "Rekomendasi tempat makan murah, laundry, toko cetak, dan promo kantong mahasiswa.",
    shareButton: "+ Bagikan Rekomendasi"
  },
  filters: [
    { value: "all", label: "Semua", icon: "" },
    { value: "kuliner", label: "Kuliner Hemat", icon: "🍛" },
    { value: "cetak", label: "Cetak & Banner", icon: "🖨️" },
    { value: "laundry", label: "Laundry & Kost", icon: "🧺" },
    { value: "promo", label: "Promo KTM Kampus", icon: "🎟️" }
  ],
  modal: {
    commentCountPrefix: "Komentar & Diskusi",
    commentInputPlaceholder: "Tulis tanggapan atau pertanyaan...",
    commentSubmitButton: "Kirim",
    emptyComments: "Belum ada komentar. Jadi yang pertama menanggapi!"
  },
  form: {
    title: {
      label: "Judul Tempat / Promo",
      placeholder: "Warung Makan Bu Tini"
    },
    category: {
      label: "Kategori",
      options: [
        { value: "kuliner", label: "Kuliner Hemat" },
        { value: "cetak", label: "Cetak & Banner" },
        { value: "laundry", label: "Laundry & Kost" },
        { value: "promo", label: "Promo KTM Kampus" }
      ]
    },
    location: {
      label: "Lokasi",
      placeholder: "Depan Gerbang Utama"
    },
    summary: {
      label: "Ringkasan Info Singkat",
      placeholder: "Nasi + sayur sepuasnya cuma Rp 8.000!"
    },
    description: {
      label: "Deskripsi Lengkap & Review",
      placeholder: "Warung ini cocok banget buat akhir bulan, harga murah meriah dan rasa memuaskan. Es teh gratis kalau tunjukin KTM."
    },
    submitButton: "Bagikan Informasi"
  },
  alerts: {
    loginRequired: "Silakan masuk terlebih dahulu untuk membagikan informasi.",
    successMessage: "Informasi berhasil ditambahkan!"
  },
  isMock: true,
  mockInfoData: [
    {
      id: "INF-101",
      judul: "Warung Makan Pak Di",
      kategoriKey: "kuliner",
      kategoriLabel: "Kuliner Hemat",
      icon: "🍛",
      badgeBg: "bg-success-soft text-success-text",
      lokasi: "Belakang Fakultas Teknik (Dekat Pos 2)",
      ringkasan: "Nasi + sayur sepuasnya cuma Rp 8.000! Cocok banget buat tanggal tua.",
      deskripsiLengkap: "Warung Makan Pak Di menyediakan menu makan prasmanan khusus mahasiswa. Cukup bayar Rp 8.000 sudah dapet Nasi Sepuasnya, Sayur Bebas Pilih, Lauk Tahu/Tempe, plus Es Teh Gratis kalau tunjukkan KTM!",
      author: "Rian F.",
      authorInfo: "Teknik Elektro • ⭐ 5.0",
      avatarBg: "bg-primary-hover",
      avatarLetter: "R",
      likes: 18,
      likedByText: "Disukai oleh Amelia S. dan 17 lainnya",
      comments: [
        { author: "Amelia S.", text: "Es teh gratisnya beneran masih berlaku kan kak?", date: "2 jam lalu" },
        { author: "Dinda A.", text: "Sambal ijonya mantap banget di sini!", date: "1 jam lalu" },
      ],
    },
    {
      id: "INF-102",
      judul: "Cetak Express 24 Jam",
      kategoriKey: "cetak",
      kategoriLabel: "Cetak & Banner",
      icon: "🖨️",
      badgeBg: "bg-primary-soft text-primary-text",
      lokasi: "Depan Gerbang Utama Kampus",
      ringkasan: "Diskon 10% cetak skripsi/banner kalau tunjukkan KTM aktif.",
      deskripsiLengkap: "Tempat cetak langganan anak organisasi dan mahasiswa akhir. Buka 24 jam nonstop, hasil cetak jilid super rapi, dan ada potongan harga khusus 10% untuk pengerjaan banner acara kampus.",
      author: "Dinda A.",
      authorInfo: "Desain Komunikasi Visual • ⭐ 4.9",
      avatarBg: "bg-success-base",
      avatarLetter: "D",
      likes: 12,
      likedByText: "Disukai oleh Rian F. dan 11 lainnya",
      comments: [
        { author: "Bagus T.", text: "Bisa kirim file lewat WA dulu ga ya sebelum datang?", date: "Kemarin" }
      ],
    },
    {
      id: "INF-103",
      judul: "Kilat Laundry Mahasiswa",
      kategoriKey: "laundry",
      kategoriLabel: "Laundry & Kost",
      icon: "🧺",
      badgeBg: "bg-primary-soft text-primary-text",
      lokasi: "Gang Belakang Perpustakaan Pusat",
      ringkasan: "Rp 5.000 / kg. Antar jemput gratis khusus area kost sekitar kampus.",
      deskripsiLengkap: "Jasa cuci kilat pakaian mahasiswa. Hasil wangi tahan lama, lipatan rapi, dan minimal cuci cuma 2 kg sudah dapet layanan free antar-jemput langsung ke depan pagar kost.",
      author: "Amelia S.",
      authorInfo: "Informatika UNS • ⭐ 4.9",
      avatarBg: "bg-primary-base",
      avatarLetter: "A",
      likes: 24,
      likedByText: "Disukai oleh Rian F., Dinda A., dan 22 lainnya",
      comments: [
        { author: "Siti K.", text: "Pengerjaan berapa hari kalau regular kak?", date: "3 hari lalu" }
      ],
    },
    {
      id: "INF-104",
      judul: "Promo Kopi Kampus - Beli 1 Gratis 1",
      kategoriKey: "promo",
      kategoriLabel: "Promo KTM Kampus",
      icon: "🎟️",
      badgeBg: "bg-warning-soft text-warning-text",
      lokasi: "Kantin Pusat FITDS",
      ringkasan: "Khusus hari Senin-Rabu jam 13.00 - 16.00 tunjukkan KTM UNS.",
      deskripsiLengkap: "Promo khusus mahasiswa aktif! Beli varian kopi susu aren ukuran besar gratis 1 kopi hitam cold brew. Cukup tunjukkan fisik KTM atau kartu mahasiswa digital di aplikasi.",
      author: "Fikri K.",
      authorInfo: "Sains Data • ⭐ 4.8",
      avatarBg: "bg-warning-base",
      avatarLetter: "F",
      likes: 31,
      likedByText: "Disukai oleh 31 mahasiswa",
      comments: [],
    },
  ]
};
