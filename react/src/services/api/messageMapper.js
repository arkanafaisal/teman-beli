export const getApiMessage = (path, code, method = "GET") => {
  if (code >= 200 && code < 300) {
    return null; // Sukses secara default tidak direturn message-nya kecuali perlu
  }

  // Normalisasi Path dinamis agar sesuai dictionary
  let normalizedPath = path;
  if (path.match(/\/patungan\/\d+/)) {
    normalizedPath = path.replace(/\/\d+.*/, (m) => m.includes("comments") ? "/patungan/:id/comments" : m.includes("join") ? "/patungan/:id/join" : m.includes("leave") ? "/patungan/:id/leave" : m.includes("status") ? "/patungan/:id/status" : "/patungan/:id");
  }
  if (path.match(/\/community\/\d+/)) {
    normalizedPath = path.replace(/\/\d+.*/, (m) => m.includes("comments") ? "/community/:id/comments" : m.includes("join") ? "/community/:id/join" : m.includes("leave") ? "/community/:id/leave" : "/community/:id");
  }

  // Kamus mapping pesan berdasarkan path (endpoint) dan method
  const dict = {
    "/auth/login": {
      401: "Email kampus tidak valid atau kata sandi salah.",
      403: "Akun email Anda (SSO) belum terverifikasi atau akses ditangguhkan.",
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
      }
    },
    "/patungan/:id/join": {
      POST: {
        403: "Kuota patungan ini sudah penuh atau Anda sudah bergabung."
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
    "/community": {
      POST: {
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
