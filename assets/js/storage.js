const DB = {
  KEY_PATUNGAN: "patungan_db",
  KEY_USER: "user_db",
  KEY_THEME: "theme_mode",

  init() {
    if (!localStorage.getItem(this.KEY_PATUNGAN)) {
      const initialData = [
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
          replies: [{ date: "2026-09-27", text: "Barang ready di toko online, slot tersisa 400 lembar lagi ya!" }],
        },
      ];
      localStorage.setItem(this.KEY_PATUNGAN, JSON.stringify(initialData));
    }

    if (!localStorage.getItem(this.KEY_USER)) {
      localStorage.setItem(this.KEY_USER, JSON.stringify({ isLoggedIn: false, isVerified: false, name: "" }));
    }
  },

  getPatungan() {
    return JSON.parse(localStorage.getItem(this.KEY_PATUNGAN)) || [];
  },

  addPatungan(item) {
    const data = this.getPatungan();
    data.unshift(item);
    localStorage.setItem(this.KEY_PATUNGAN, JSON.stringify(data));
  },

  getUser() {
    return JSON.parse(localStorage.getItem(this.KEY_USER));
  },

  setUser(userData) {
    localStorage.setItem(this.KEY_USER, JSON.stringify(userData));
  },
};

DB.init();
