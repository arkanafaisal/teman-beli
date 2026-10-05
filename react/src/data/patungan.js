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
      { label: "Pangan", value: "PANGAN", icon: "🍿" },
      { label: "Kos", value: "KOS", icon: "🏠" },
      { label: "Kampus", value: "KAMPUS", icon: "📚" },
      { label: "Digital", value: "DIGITAL", icon: "💻" }
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
      lockedButton: "Masuk dengan SSO Kampus untuk Ikut Patungan",
      editButton: "Edit"
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
    editModalTitle: "Edit Patungan",
    title: {
      label: "Nama Barang / Pengumuman",
      placeholder: "Kertas HVS A4 80gsm 1 Rim"
    },
    category: {
      label: "Kategori",
      options: [
        { value: "PANGAN", label: "Pangan" },
        { value: "KOS", label: "Kos & Fasilitas" },
        { value: "KAMPUS", label: "Alat & Kebutuhan Kampus" },
        { value: "DIGITAL", label: "Layanan Digital" }
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
    updateComment: {
      label: "Alasan Pembaruan (Wajib)",
      placeholder: "Kenapa Anda mengupdate patungan ini? (Misal: Harga naik, dll)"
    },
    submitButton: "Posting Pengumuman",
    saveChangesButton: "Simpan Perubahan"
  },
  alerts: {
    loginRequired: "Anda harus login terlebih dahulu!",
    successMessage: "Pengumuman patungan berhasil diposting!"
  }
};
