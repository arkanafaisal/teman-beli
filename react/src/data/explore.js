export const exploreData = {
  header: {
    title: "Katalog Patungan Aktif",
    subtitle: "Cari penawaran barang grosir yang butuh partisipan di sekitarmu.",
    createButton: "+ Buat Patungan Baru",
  },
  search: {
    placeholder: "Cari barang atau titik kumpul...",
  },
  filters: [
    { label: "Semua", value: "All", icon: null },
    { label: "Alat Tulis", value: "Alat Tulis & Cetak", icon: "📚" },
    { label: "Praktikum", value: "Bahan Praktikum", icon: "🧪" },
    { label: "Makanan", value: "Makanan / Snacking", icon: "🍿" },
    { label: "Kost", value: "Kebutuhan Kost", icon: "🏠" }
  ],
  emptyState: {
    message: "Tidak ada patungan yang cocok.",
    subMessage: "Coba kata kunci lain atau pilih kategori yang berbeda."
  },
  card: {
    until: "s.d.",
    collected: "Terkumpul:",
    estimatedPortion: "Estimasi Porsi",
    detailButton: "Detail \u2192" // -> arrow
  },
  alerts: {
    loginRequired: "Masuk dulu yuk untuk lanjut membuat patungan!"
  },
  isMock: true,
  mockData: [
    {
      id: "pat-1",
      title: "Kertas HVS A4 80gsm 1 Rim",
      category: "Alat Tulis & Cetak",
      unit: "lembar",
      targetQuota: 500,
      currentQuota: 100,
      totalPrice: 50000,
      unitPrice: 100,
      creatorName: "Amelia S.",
      creatorCampus: "Universitas Sebelas Maret",
      isVerified: true,
      whatsapp: "6281234567890",
      area: "Kantin Gedung C FITDS",
      deadline: "2026-10-05",
      notes: "Dibutuhkan untuk cetak draf tugas akhir/laporan. Beli di Manggala.",
      refLink: "https://tokopedia.com",
      status: "open",
      replies: [
        { date: "2026-09-27", text: "Barang ready di toko online, slot tersisa 400 lembar lagi ya!" }
      ],
    }
  ]
};
