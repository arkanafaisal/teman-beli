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
        401: "Sesi masuk telah kedaluwarsa, silakan login kembali."
      }
    },
    "/users/profile": {
      GET: {
        401: "Anda harus masuk untuk melihat profil Anda.",
        404: "Data profil pengguna tidak ditemukan."
      },
      PUT: {
        200: "Profil Anda berhasil diperbarui.",
        400: "Data form profil tidak lengkap atau tidak valid."
      }
    },
    "/users/password": {
      PUT: {
        200: "Password berhasil disimpan.",
        400: "Password minimal 6 karakter dan konfirmasi harus cocok."
      }
    },
    "/users/reviews": {
      GET: {
        401: "Anda belum masuk."
      }
    },
    "/users/activity": {
      GET: {
        401: "Anda belum masuk."
      }
    },
    "/patungan": {
      POST: {
        400: "Data form patungan tidak lengkap, mohon periksa kembali.",
        401: "Anda harus login terlebih dahulu.",
        409: "Anda sudah memiliki patungan aktif. Harap selesaikan dulu patungan sebelumnya."
      }
    },
    "/patungan/:id": {
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
        200: "Pembaruan status (log) berhasil ditambahkan.",
        400: "Teks pembaruan tidak boleh kosong.",
        403: "Hanya host yang dapat menambahkan pembaruan status.",
        404: "Patungan tidak ditemukan."
      }
    },
    "/patungan/:id/join": {
      POST: {
        400: "Jumlah porsi tidak valid atau melebihi sisa kuota.",
        403: "Anda adalah host dari patungan ini.",
        404: "Patungan tidak ditemukan.",
        409: "Anda sudah mendaftar pada patungan ini."
      }
    },
    "/patungan/:id/participants": {
      GET: {
        403: "Hanya host yang bisa melihat partisipan.",
        404: "Patungan tidak ditemukan."
      }
    },
    "/patungan/:id/participants/:participantId": {
      PATCH: {
        400: "Host tidak dapat mengubah status dirinya sendiri.",
        403: "Hanya host yang bisa mengubah status partisipan.",
        404: "Patungan tidak ditemukan."
      },
      DELETE: {
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
        400: "Status yang diminta tidak valid atau alur salah.",
        403: "Hanya pembuat patungan yang dapat mengubah status."
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
      POST: {
        201: "Informasi berhasil ditambahkan!",
        400: "Data pengajuan komunitas tidak valid.",
        409: "Nama komunitas tersebut sudah pernah diajukan atau sudah ada.",
      }
    },
    "/community/:id": {
      DELETE: {
        403: "Anda tidak memiliki hak untuk menghapus komunitas ini."
      }
    },
    "/community/:id/leave": {
      POST: {
        403: "Anda tidak bisa keluar karena Anda adalah pembuat atau belum bergabung."
      }
    },
    "/history": {
      GET: {
        401: "Anda harus login untuk melihat riwayat aktivitas.",
        500: "Gagal memuat riwayat aktivitas."
      }
    },
    "/history/summary": {
      GET: {
        401: "Anda harus login untuk melihat rangkuman aktivitas.",
        500: "Gagal memuat rangkuman aktivitas."
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
