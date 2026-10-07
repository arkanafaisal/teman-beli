export const getApiMessage = (path, code, method = "GET") => {

  // Normalisasi Path dinamis agar sesuai dictionary
  let normalizedPath = path;
  if (path.startsWith("/patungan/")) {
    if (path.match(/^\/patungan\/[a-f0-9\-]+$/)) {
      normalizedPath = "/patungan/:id";
    } else if (path.match(/^\/patungan\/[a-f0-9\-]+\/join$/)) {
      normalizedPath = "/patungan/:id/join";
    } else if (path.match(/^\/patungan\/[a-f0-9\-]+\/leave$/)) {
      normalizedPath = "/patungan/:id/leave";
    } else if (path.match(/^\/patungan\/[a-f0-9\-]+\/status$/)) {
      normalizedPath = "/patungan/:id/status";
    } else if (path.match(/^\/patungan\/[a-f0-9\-]+\/log$/)) {
      normalizedPath = "/patungan/:id/log";
    } else if (path.match(/^\/patungan\/[a-f0-9\-]+\/finish$/)) {
      normalizedPath = "/patungan/:id/finish";
    } else if (path.match(/^\/patungan\/[a-f0-9\-]+\/comments$/)) {
      normalizedPath = "/patungan/:id/comments";
    } else if (path.match(/^\/patungan\/[a-f0-9\-]+\/participants$/)) {
      normalizedPath = "/patungan/:id/participants";
    } else if (path.match(/^\/patungan\/[a-f0-9\-]+\/participants\/[a-f0-9\-]+$/)) {
      normalizedPath = "/patungan/:id/participants/:participantId";
    } else if (path.match(/^\/patungan\/[a-f0-9\-]+\/reviews$/)) {
      normalizedPath = "/patungan/:id/reviews";
    }
  } else if (path.startsWith("/community/")) {
    if (path.match(/^\/community\/[a-f0-9\-]+$/)) {
      normalizedPath = "/community/:id";
    } else if (path.match(/^\/community\/[a-f0-9\-]+\/join$/)) {
      normalizedPath = "/community/:id/join";
    } else if (path.match(/^\/community\/[a-f0-9\-]+\/leave$/)) {
      normalizedPath = "/community/:id/leave";
    } else if (path.match(/^\/community\/[a-f0-9\-]+\/comments$/)) {
      normalizedPath = "/community/:id/comments";
    }
  }

  // Kamus mapping pesan berdasarkan path (endpoint) dan method
  const dict = {
    "/auth/login": {
      POST: {
        200: "Login Berhasil! Domain email kampus terverifikasi.",
        400: "Data otentikasi tidak valid atau kosong.",
        401: "Sesi otentikasi Google Anda kedaluwarsa atau tidak valid.",
        403: "Akses Ditolak: Harap gunakan email kampus (.ac.id atau .edu)."
      }
    },
    "/auth/login-manual": {
      POST: {
        200: "Login manual berhasil.",
        400: "Data email atau password tidak valid.",
        401: "Email atau password salah.",
        403: "Akun ini belum memiliki password. Silakan login via Google terlebih dahulu."
      }
    },
    "/auth/logout": {
      POST: {
        200: "Anda telah berhasil keluar dari sesi."
      }
    },
    "/auth/refresh": {
      POST: {
        200: "Sesi berhasil diperbarui.",
        401: "Sesi masuk telah kedaluwarsa, silakan login kembali."
      }
    },
    "/users/profile": {
      GET: {
        200: "Data profil berhasil dimuat.",
        401: "Anda harus masuk untuk melihat profil Anda.",
        404: "Data profil pengguna tidak ditemukan."
      },
      PUT: {
        200: "Profil Anda berhasil diperbarui.",
        400: "Data form profil tidak lengkap atau tidak valid."
      },
      DELETE: {
        200: "Akun Anda berhasil dihapus.",
        400: "Nama konfirmasi tidak boleh kosong.",
        403: "Nama konfirmasi tidak cocok, penghapusan dibatalkan."
      }
    },
    "/users/reviews": {
      GET: {
        200: "Ulasan berhasil dimuat.",
        401: "Anda belum masuk."
      }
    },
    "/users/activity": {
      GET: {
        200: "Aktivitas berhasil dimuat.",
        401: "Anda belum masuk."
      }
    },
    "/users/communities": {
      GET: {
        200: "Komunitas berhasil dimuat.",
        401: "Anda belum masuk."
      }
    },
    "/patungan": {
      GET: {
        200: "Daftar patungan berhasil dimuat."
      },
      POST: {
        201: "Patungan berhasil dibuat!",
        400: "Data form patungan tidak lengkap, mohon periksa kembali.",
        401: "Anda harus login terlebih dahulu.",
        409: "Anda sudah memiliki patungan aktif. Harap selesaikan dulu patungan sebelumnya."
      }
    },
    "/patungan/:id": {
      GET: {
        200: "Detail patungan berhasil dimuat.",
        404: "Patungan tidak ditemukan."
      },
      DELETE: {
        403: "Anda tidak memiliki hak untuk menghapus patungan ini."
      },
      PUT: {
        200: "Data patungan berhasil diperbarui.",
        400: "Data pembaruan tidak lengkap atau tidak valid.",
        403: "Anda tidak diizinkan untuk mengedit patungan ini.",
        404: "Patungan tidak ditemukan."
      }
    },
    "/patungan/:id/log": {
      POST: {
        201: "Pembaruan status (log) berhasil ditambahkan.",
        400: "Teks pembaruan tidak boleh kosong.",
        403: "Hanya host yang dapat menambahkan pembaruan status.",
        404: "Patungan tidak ditemukan."
      }
    },
    "/patungan/:id/join": {
      POST: {
        201: "Berhasil mendaftar patungan!",
        400: "Jumlah porsi tidak valid atau melebihi sisa kuota.",
        403: "Anda adalah host dari patungan ini.",
        404: "Patungan tidak ditemukan.",
        409: "Anda sudah mendaftar pada patungan ini."
      }
    },
    "/patungan/:id/participants": {
      GET: {
        200: "Daftar partisipan berhasil dimuat.",
        403: "Hanya host yang bisa melihat partisipan.",
        404: "Patungan tidak ditemukan."
      }
    },
    "/patungan/:id/participants/:participantId": {
      PATCH: {
        200: "Status partisipan berhasil diubah.",
        400: "Host tidak dapat mengubah status dirinya sendiri.",
        403: "Hanya host yang bisa mengubah status partisipan.",
        404: "Patungan tidak ditemukan."
      },
      DELETE: {
        200: "Partisipan berhasil dihapus.",
        400: "Host tidak dapat dihapus dari patungan.",
        403: "Hanya host yang bisa menghapus partisipan.",
        404: "Patungan tidak ditemukan."
      }
    },
    "/patungan/:id/leave": {
      POST: {
        400: "Anda tidak bisa keluar karena patungan sudah diproses.",
        403: "Anda belum bergabung di patungan ini."
      }
    },
    "/patungan/:id/status": {
      PATCH: {
        200: "Status patungan berhasil diubah.",
        400: "Status yang diminta tidak valid atau alur salah.",
        403: "Hanya pembuat patungan yang dapat mengubah status.",
        404: "Patungan tidak ditemukan."
      }
    },
    "/patungan/:id/finish": {
      POST: {
        200: "Patungan berhasil diselesaikan.",
        400: "Link bukti diperlukan dan harus berupa URL yang valid.",
        403: "Hanya host yang bisa menyelesaikan patungan.",
        404: "Patungan tidak ditemukan."
      }
    },
    "/patungan/:id/reviews": {
      POST: {
        201: "Ulasan berhasil dikirim. Terima kasih!",
        400: "Data ulasan tidak valid atau patungan belum selesai.",
        403: "Anda tidak diizinkan memberi ulasan (Host tidak bisa menilai diri sendiri, atau Anda bukan partisipan yang valid).",
        404: "Patungan tidak ditemukan.",
        409: "Anda sudah pernah memberikan ulasan untuk patungan ini."
      }
    },
    "/community": {
      GET: {
        200: "Daftar komunitas berhasil dimuat."
      },
      POST: {
        201: "Informasi berhasil ditambahkan!",
        400: "Data pengajuan komunitas tidak valid.",
        401: "Anda harus login untuk membuat komunitas.",
        409: "Nama komunitas tersebut sudah pernah diajukan atau sudah ada."
      }
    },
    "/community/:id": {
      GET: {
        200: "Detail komunitas berhasil dimuat.",
        404: "Komunitas tidak ditemukan."
      },
      PUT: {
        200: "Data komunitas berhasil diperbarui.",
        400: "Data pembaruan tidak lengkap atau tidak valid.",
        403: "Anda tidak diizinkan untuk mengedit komunitas ini.",
        404: "Komunitas tidak ditemukan.",
        409: "Nama komunitas sudah digunakan."
      },
      DELETE: {
        200: "Komunitas berhasil dihapus.",
        403: "Anda tidak memiliki hak untuk menghapus komunitas ini.",
        404: "Komunitas tidak ditemukan."
      }
    },
    "/community/:id/comments": {
      POST: {
        201: "Komentar berhasil ditambahkan!",
        400: "Komentar tidak valid. (Minimal 2 karakter, Maksimal 500 karakter).",
        401: "Anda harus login untuk menambahkan komentar.",
        404: "Komunitas tidak ditemukan."
      }
    },
    "/community/:id/like": {
      POST: {
        200: "Berhasil mengubah like komunitas.",
        401: "Anda harus login untuk menyukai komunitas.",
        404: "Komunitas tidak ditemukan."
      }
    },
    "/community/:id/leave": {
      POST: {
        403: "Anda tidak bisa keluar karena Anda adalah pembuat atau belum bergabung."
      }
    },
    "/history": {
      GET: {
        200: "Riwayat aktivitas berhasil dimuat.",
        401: "Anda harus login untuk melihat riwayat aktivitas.",
        500: "Gagal memuat riwayat aktivitas."
      }
    },
    "/history/summary": {
      GET: {
        200: "Rangkuman aktivitas berhasil dimuat.",
        401: "Anda harus login untuk melihat rangkuman aktivitas.",
        500: "Gagal memuat rangkuman aktivitas."
      }
    },
    "/public/stats": {
      GET: {
        200: "Statistik publik berhasil dimuat."
      }
    }
  };

  // Cek mapping
  if (dict[normalizedPath]) {
    // Jika bentuknya object dan punya method (e.g. POST)
    if (dict[normalizedPath][method] && dict[normalizedPath][method][code]) {
      return dict[normalizedPath][method][code];
    }
    // Jika bentuknya flat ke status code langsung (seperti auth/login)
    if (dict[normalizedPath][code]) {
      return dict[normalizedPath][code];
    }
  }

  // Fallback Sukses (Tanpa Pesan)
  if (code >= 200 && code < 300) {
    return null; 
  }

  // Fallback Pesan Umum HTTP (Reverse Engineering)
  switch (code) {
    case 400: return "Permintaan tidak valid (Bad Request).";
    case 401: return "Sesi habis atau tidak memiliki akses (Unauthorized).";
    case 403: return "Anda dilarang mengakses fitur ini (Forbidden).";
    case 404: return "Data atau fitur tidak ditemukan (Not Found).";
    case 429: return "Terlalu banyak permintaan, harap tunggu sebentar (Too Many Requests).";
    case 500: return "Terjadi kesalahan internal pada server (Internal Server Error).";
    case 503: return "Layanan sedang sibuk atau dalam perbaikan (Service Unavailable).";
    default: return `Terjadi kesalahan pada sistem (Kode: ${code}).`;
  }
};
