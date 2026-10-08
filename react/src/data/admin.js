export const adminData = {
  layout: {
    sidebar: {
      brand: "Teman Beli",
      workspace: "Admin Workspace",
      menuSection1: "Utama",
      dashboard: "Dashboard",
      menuSection2: "Kelola Konten",
      patungan: "Patungan",
      pengguna: "Pengguna",
      ulasan: "Ulasan & Rating",
      komunitas: "Rekomendasi & Komunitas",
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
      activePatunganLabel: "Patungan Aktif",
      totalUsersLabel: "Total Pengguna",
      totalReviewsLabel: "Total Ulasan",
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
    title: "Rekomendasi & Komunitas",
    featured: {
      title: "Rekomendasi Utama (Banner Depan)",
      subtitle: "Patungan yang di-pin untuk tampil di halaman utama customer",
      addBtn: "+ Pin Patungan Baru",
      unpinAction: "Lepas dari Pin Header",
      featuredLabel: "Featured"
    },
    groups: {
      title: "Grup Diskusi & Komunitas Kampus",
      subtitle: "Grup yang dibentuk pengguna untuk berkoordinasi",
      addBtn: "+ Buat Grup Baru",
      manageAction: "Kelola Grup"
    }
  },
  patungan: {
    title: "Kelola Project Patungan",
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
    title: "Manajemen Pengguna",
    searchPlaceholder: "Cari nama, NIM, email, atau jurusan...",
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
      suspend: "Suspend",
      verify: "Verifikasi KTM"
    }
  },
  ulasan: {
    title: "Ulasan & Rating",
    overview: {
      totalReviews: "Dari 458 Ulasan",
      stats1: "Pengguna puas dengan kecepatan tim patungan",
      stats2: "Proses pembayaran terverifikasi aman",
      exportBtn: "Export Laporan Ulasan"
    },
    actions: {
      show: "Tampilkan di Homepage",
      hide: "Sembunyikan"
    }
  }
};
