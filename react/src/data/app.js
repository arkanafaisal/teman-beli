export const appData = {
  brand: {
    icon: "🎓",
    nameHighlight: "Teman",
    nameNormal: "Beli"
  },
  header: {
    navLinks: [
      { label: "Beranda", path: "/" },
      { label: "Patungan", path: "/patungan" },
      { label: "Komunitas", path: "/komunitas" },
      { label: "Profil", path: "/profil" }
    ],
    auth: {
      loginButton: "Masuk",
      logoutButton: "Keluar",
      greetingPrefix: "Hi,",
      verifiedBadge: "Verified",
      modal: {
        title: "Masuk ke TemanBeli",
        warningTextHtml: "Wajib gunakan email kampus<br/>(akhiran .ac.id)",
        explanationTextHtml: "<strong>Mengapa harus pakai akun kampus?</strong> Agar kita bisa memastikan semua orang di sini adalah mahasiswa asli. Ini demi keamanan dan kenyamanan patungan bersama!",
        manualLogin: {
          emailPlaceholder: "Email Mahasiswa (.ac.id)",
          passwordPlaceholder: "Password (jika sudah diset)",
          buttonNormal: "Masuk Manual",
          buttonLoading: "Memproses...",
          divider: "ATAU"
        }
      }
    }
  }
};
