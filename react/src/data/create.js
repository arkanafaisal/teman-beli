export const createData = {
  header: {
    backButton: "← Batal & Kembali",
    title: "Buat Patungan Baru",
  },
  form: {
    title: {
      label: "Nama Barang / Pengumuman *",
      placeholder: "Contoh: Kertas HVS A4 80gsm 1 Rim"
    },
    category: {
      label: "Kategori *",
      options: [
        { value: "Alat Tulis & Cetak", label: "Alat Tulis & Cetak" },
        { value: "Bahan Praktikum", label: "Bahan Praktikum" },
        { value: "Makanan / Snacking", label: "Makanan / Snacking" },
        { value: "Kebutuhan Kost", label: "Kebutuhan Kost" },
        { value: "Lainnya", label: "Lainnya" }
      ]
    },
    unit: {
      label: "Satuan Barang *",
      placeholder: "lembar, meter, kg, pcs"
    },
    targetQuota: {
      label: "Total Target Buy *",
      placeholder: "500"
    },
    totalPrice: {
      label: "Total Harga (Rp) *",
      placeholder: "50000"
    },
    currentQuota: {
      label: "Porsi Kamu (Awal) *",
      placeholder: "100"
    },
    unitPricePreview: {
      label: "💡 Estimasi Harga per Satuan:",
      prefix: "Rp"
    },
    area: {
      label: "Estimasi Titik Kumpul *",
      placeholder: "Contoh: Kantin FITDS UNS"
    },
    deadline: {
      label: "Batas Waktu (Deadline) *"
    },
    whatsapp: {
      label: "Nomor WhatsApp (Aktif) *",
      placeholder: "6281234567890",
      helpText: "Format menggunakan kode negara 62..."
    },
    notes: {
      label: "Catatan Tambahan (Opsional)",
      placeholder: "Penjelasan detail barang, lokasi toko offline, dll."
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
  }
};
