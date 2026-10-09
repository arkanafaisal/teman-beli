export const communityData = {
  header: {
    title: "Info Kampus & Rekomendasi",
    subtitle: "Rekomendasi tempat makan murah, laundry, toko cetak, dan promo kantong mahasiswa.",
    shareButton: "+ Bagikan Rekomendasi"
  },
  search: {
    placeholder: "Cari info, tempat, promo..."
  },
  filters: [
    { value: "all", label: "Semua", icon: "" },
    { value: "MAKAN", label: "Tempat Makan", icon: "🍛" },
    { value: "KAMPUS", label: "Kebutuhan Kampus", icon: "📚" },
    { value: "KOS", label: "Kos & Fasilitas", icon: "🏠" }
  ],
  modal: {
    commentCountPrefix: "Komentar & Diskusi",
    commentInputPlaceholder: "Tulis tanggapan atau pertanyaan...",
    commentSubmitButton: "Kirim",
    emptyComments: "Belum ada komentar. Jadi yang pertama menanggapi!"
  },
  form: {
    modalTitle: "Bagikan Info & Rekomendasi",
    title: {
      label: "Judul Tempat / Promo",
      placeholder: "Warung Makan Bu Tini"
    },
    category: {
      label: "Kategori",
      options: [
        { value: "MAKAN", label: "Tempat Makan" },
        { value: "KAMPUS", label: "Kebutuhan Kampus" },
        { value: "KOS", label: "Kos & Fasilitas" }
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
  }
};
