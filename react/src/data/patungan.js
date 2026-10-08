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
      lockedButton: "Masuk dengan Email Kampus untuk Ikut Patungan",
      editButton: "Edit",
      joinButton: "Daftar Patungan",
      joinHelper: "(Pastikan sudah bertanya mengenai teknisnya kepada host-nya lewat WA)",
      manageButton: "Kelola Partisipan",
      finishButton: "Selesaikan Patungan"
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
      label: "Target Total Satuan",
      placeholder: "500"
    },
    totalPrice: {
      label: "Total Harga (Rp)",
      placeholder: "50000"
    },
    currentQuota: {
      label: "Kontribusi Awalmu",
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
      label: "Waktu Selesai"
    },
    whatsapp: {
      label: "Nomor WhatsApp Aktif",
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
    successMessage: "Pengumuman patungan berhasil diposting!",
    updateSuccess: "Pembaruan berhasil disimpan!",
    cancelSuccess: "Patungan berhasil dibatalkan",
    deleteSuccess: "Partisipan berhasil dihapus",
    statusSuccess: "Status partisipan berhasil diubah",
    finishSuccess: "Patungan berhasil diselesaikan!",
    replySuccess: "Update status berhasil ditambahkan",
    joinSuccess: "Berhasil mendaftar! Menunggu persetujuan host.",
    invalidQuota: "Masukkan nominal yang valid"
  },
  manageParticipants: {
    modalTitle: "Kelola Partisipan",
    emptyState: "Belum ada partisipan yang mendaftar.",
    loading: "Memuat partisipan...",
    acceptButton: "Terima",
    rejectButton: "Tolak",
    acceptedLabel: "Diterima",
    rejectedLabel: "Ditolak",
    quotaLabel: "Kuota:",
    statusSuccess: "Status partisipan berhasil diupdate!",
    statusError: "Gagal mengupdate status",
    deleteButton: "Hapus",
    deleteSuccess: "Partisipan berhasil dihapus!",
    deleteError: "Gagal menghapus partisipan"
  }
};
