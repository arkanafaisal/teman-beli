export const adminData = {
  layout: {
    sidebar: {
      brand: "Teman Beli",
      workspace: "Mode Admin",
      menuSection1: "Utama",
      dashboard: "Dashboard",
      menuSection2: "Kelola Konten",
      patungan: "Patungan",
      pengguna: "Pengguna",
      ulasan: "Ulasan",
      komunitas: "Komunitas",
      backToApp: "Lihat Tampilan User",
      logout: "Keluar"
    },
    header: {
      searchPlaceholder: "Cari data, patungan, atau pengguna...",
      adminName: "Admin 1"
    }
  },
  dashboard: {
    title: "Panel Administrasi",
    stats: {
      activePatunganLabel: "Patungan",
      totalUsersLabel: "Pengguna",
      totalReviewsLabel: "Ulasan",
      communityLabel: "Komunitas"
    },
    activeProjects: {
      title: "Patungan Aktif & Kategori",
      subtitle: "Pantau progres ketersediaan slot patungan",
      addBtn: "+ Tambah Patungan Baru",
      tableHeaders: {
        item: "Item / Produk",
        category: "Kategori",
        target: "Target Slot",
        progress: "Progress",
        action: "Aksi"
      },
      actionEdit: "Edit"
    }
  },
  komunitas: {
    title: "Kelola Komunitas & Rekomendasi",
    filters: {
      all: "Semua (18)",
      active: "Aktif (15)",
      inactive: "Nonaktif (3)"
    },
    addBtn: "Buat Info Komunitas Baru",
    tableHeaders: {
      title: "Judul Info / Postingan",
      category: "Kategori",
      location: "Lokasi",
      author: "Penulis",
      interaction: "Interaksi",
      status: "Status",
      action: "Aksi"
    },
    status: {
      active: "Aktif",
      inactive: "Nonaktif"
    },
    actions: {
      hide: "Sembunyikan / Nonaktifkan",
      show: "Tampilkan / Aktifkan Kembali"
    },
    modalForm: {
      title: "Buat Info Komunitas Baru",
      fields: {
        title: { label: "Judul Postingan / Info", placeholder: "Contoh: Info Tempat Makan Murah Nasi Sambal Belut" },
        category: { label: "Kategori", options: ["Tempat Makan", "Kebutuhan Kampus", "Kos & Fasilitas"] },
        location: { label: "Lokasi", placeholder: "Contoh: Jalan Margonda Raya" },
        description: { label: "Deskripsi Lengkap", placeholder: "Jelaskan detail rekomendasi, harga promo, atau kontak terkait..." }
      },
      buttons: {
        cancel: "Batal",
        submit: "Publikasikan Info"
      }
    },
    modalConfirm: {
      title: "Konfirmasi Perubahan Status",
      subtitle: "Verifikasi tindakan admin",
      bodyPrefix: "Apakah Baginda Ratu yakin ingin",
      bodyHighlightHide: "menonaktifkan (menyembunyikan)",
      bodyHighlightShow: "mengaktifkan kembali",
      bodySuffix: "postingan info",
      buttons: {
        cancel: "Batal",
        submit: "Ya, Ubah Status"
      }
    }
  },
  patungan: {
    title: "Kelola Patungan",
    filters: {
      all: "Semua (32)",
      active: "Berjalan (24)",
      completed: "Selesai/Penuh (8)"
    },
    addBtn: "Buat Patungan Baru",
    tableHeaders: {
      name: "Nama Project Patungan",
      category: "Kategori",
      price: "Harga / Orang",
      progress: "Progres Slot",
      status: "Status",
      action: "Aksi"
    },
    modal: {
      title: "Buat Project Patungan Baru",
      fields: {
        title: { label: "Judul Patungan", placeholder: "Contoh: Netflix Premium 4K (4 Screen)" },
        category: { label: "Kategori", options: ["Digital & Subscription", "Buku & Cetak Akademik", "Kebutuhan Kos"] },
        targetSlot: { label: "Target Kuota Slot", placeholder: "4" },
        totalPrice: { label: "Harga Total (Rp)", placeholder: "186000" },
        pricePerPerson: { label: "Harga Per Orang (Rp)", placeholder: "46500" }
      },
      buttons: {
        cancel: "Batal",
        submit: "Publikasikan Patungan"
      }
    }
  },
  pengguna: {
    title: "Kelola Pengguna",
    searchPlaceholder: "Cari nama, email, atau jurusan...",
    filters: {
      all: "Semua (1,240)",
      pending: "Pending Verification (12)"
    },
    tableHeaders: {
      user: "Pengguna",
      program: "Program / Institusi",
      totalPatungan: "Total Patungan",
      status: "Status KTM",
      action: "Aksi"
    },
    status: {
      verified: "Terverifikasi",
      pending: "Menunggu Verifikasi"
    },
    actions: {
      detail: "Detail",
      suspend: "Hapus",
      verify: "Verifikasi KTM"
    }
  },
  ulasan: {
    title: "Kelola Ulasan",
    overview: {
      totalReviews: "Dari 458 Ulasan",
      stats1: "Pengguna puas dengan kecepatan tim patungan",
      stats2: "Proses pembayaran terverifikasi aman",
      exportBtn: "Export Laporan Ulasan"
    },
    actions: {
      show: "Tampilkan di Beranda",
      hide: "Sembunyikan"
    }
  }
};
