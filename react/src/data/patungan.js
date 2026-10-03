export const patunganData = {
  feed: {
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
      detailButton: "Detail \u2192"
    },
    alerts: {
      loginRequired: "Masuk dulu yuk untuk lanjut membuat patungan!"
    }
  },
  detail: {
    header: {
      backButton: "← Kembali ke Beranda"
    },
    errorState: {
      notFound: "Data patungan tidak ditemukan."
    },
    card: {
      deadlineLabel: "Deadline:",
      locationLabel: "Titik Kumpul:",
      estimatedPriceLabel: "Estimasi Harga",
      remainingQuotaLabel: "Sisa Kuota",
      quotaFull: "Penuh",
      targetQuotaLabel: "Total Target",
      progressLabel: "Progres Terkumpul",
      notesLabel: "Catatan Kreator:",
      emptyNotes: "Tidak ada catatan khusus.",
      refLinkLabel: "Tautan / Foto Referensi"
    },
    creator: {
      createdBy: "Dibuat oleh:",
      protectedName: "••••••••••••",
      verifiedBadge: ""
    },
    actions: {
      whatsappButton: "Hubungi Kreator via WhatsApp",
      whatsappTemplate: "Halo {creatorName}, saya mau ikut patungan \"{title}\" yang di-post di TemanBeli. Masih ada slot?",
      lockedButton: "Masuk dengan SSO Kampus untuk Ikut Patungan"
    },
    replies: {
      title: "Log Pembaruan Status",
      subtitle: "",
      emptyReplies: "Belum ada pembaruan dari kreator.",
      sendButton: "Kirim",
      inputPlaceholder: "Tulis pembaruan status patungan..."
    },
    alerts: {
      loginRequired: "Masuk dulu yuk untuk lanjut!"
    }
  },
  form: {
    modalTitle: "Buat Patungan Baru",
    title: {
      label: "Nama Barang / Pengumuman",
      placeholder: "Kertas HVS A4 80gsm 1 Rim"
    },
    category: {
      label: "Kategori",
      options: [
        { value: "Alat Tulis & Cetak", label: "Alat Tulis & Cetak" },
        { value: "Bahan Praktikum", label: "Bahan Praktikum" },
        { value: "Makanan / Snacking", label: "Makanan / Snacking" },
        { value: "Kebutuhan Kost", label: "Kebutuhan Kost" },
        { value: "Lainnya", label: "Lainnya" }
      ]
    },
    unit: {
      label: "Satuan Barang",
      placeholder: "rim"
    },
    targetQuota: {
      label: "Total Kebutuhan Kuota",
      placeholder: "500"
    },
    totalPrice: {
      label: "Total Harga (Rp)",
      placeholder: "50000"
    },
    currentQuota: {
      label: "Porsi Kamu (Awal)",
      placeholder: "100"
    },
    unitPricePreview: {
      label: "💡 Estimasi Harga per Satuan:",
      prefix: "Rp"
    },
    area: {
      label: "Estimasi Titik Kumpul",
      placeholder: "Kantin FITDS UNS"
    },
    deadline: {
      label: "Batas Waktu (Deadline)"
    },
    whatsapp: {
      label: "Nomor WhatsApp (Aktif)",
      placeholder: "6281234567890",
      helpText: "Format menggunakan kode negara 62..."
    },
    notes: {
      label: "Catatan Tambahan (Opsional)",
      placeholder: "Beli di Toko Anugrah, jalan Mawar. Ketemuan di kantin."
    },
    refLink: {
      label: "Link Referensi (Opsional)",
      placeholder: "https://tokopedia.com/..."
    },
    submitButton: "Posting Pengumuman"
  },
  alerts: {
    loginRequired: "Anda harus login terlebih dahulu!",
    successMessage: "Pengumuman patungan berhasil diposting!"
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
