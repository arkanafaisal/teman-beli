# Wireframe Lengkap TemanBeli (Mobile-First ASCII)

Berikut adalah wireframe mendetail dalam format ASCII untuk seluruh halaman versi vanilla TemanBeli. Wireframe ini dirancang penuh (*full*) dari awal hingga footer, mempresentasikan setiap section (*Hero, Kategori, Fitur, History, Testimoni, FAQ, Footer*) sesuai dengan struktur aktual di file HTML.

---

## 1. Navigasi Global (Header & Menu Mobile)

**Header (Tampil di semua halaman):**
```text
+------------------------------------+
| 🎓 PatunganAja!           [🌙] [=] |
+------------------------------------+
```

**Saat Hamburger Menu `[=]` Diklik (Drawer Turun):**
```text
+------------------------------------+
| 🎓 PatunganAja!           [🌙] [X] |
+------------------------------------+
|                                    |
|   > Beranda                        |
|   > Eksplor                        |
|   > Komunitas                      |
|   > Profil                         |
|                                    |
| ---------------------------------- |
|   [       Masuk SSO Kampus       ] |
|                                    |
+------------------------------------+
```

---

## 2. Beranda (`index.html`)

```text
+------------------------------------+
| 🎓 PatunganAja!           [🌙] [=] |
+------------------------------------+
|                                    |
| ====== HERO SECTION ======         |
| # Beli Grosir Lebih Hemat,         |
|   Bayar Sesuai Porsi Kamu.         |
|                                    |
| Solusi patungan belanja kertas HVS,|
| bahan praktikum, dll...            |
|                                    |
|   [ Jelajahi Patungan &rarr; ]     |
|   [   Rekap Penghematan      ]     |
|                                    |
| ====== STAT COUNTER ======         |
| 100%             Rp 0     Otomatis |
| Verified        Admin    Kalkulasi |
| Mahasiswa      Platform     Satuan |
|                                    |
| ====== KATEGORI POPULER ======     |
| Pilihan Hemat                      |
| Kategori Patungan Populer          |
|                                    |
| [📚 Alat Tulis]  [🧪 Praktikum]    |
| [🍿 Snack]       [🏠 Kost]         |
|                                    |
| ====== FITUR UTAMA ======          |
| Keunggulan Platform                |
|                                    |
| [🛡️] Keamanan SSO Kampus           |
| Hanya akun verified email kampus.. |
|                                    |
| [🧮] Sistem Hitung Otomatis        |
| Otomatis membagi estimasi harga..  |
|                                    |
| [📍] Titik Kumpul Kampus           |
| Pilih lokasi serah terima..        |
|                                    |
| ====== HISTORY & HEMAT ======      |
| Dampak Nyata TemanBeli             |
| Rekap & History Penghematan        |
|                                    |
| +--------------------------------+ |
| | Total Uang Dihemat   [Otomatis]| |
| | Rp 0                           | |
| | Dari 0x transaksi selesai      | |
| | Rata-rata hemat: ~Rp 0         | |
| +--------------------------------+ |
|                                    |
| History Patungan Selesai           |
| [ Daftar History Kosong / Isi ]    |
| [ v Lihat Lebih Banyak ]           |
|                                    |
| ====== TESTIMONI ======            |
| Pendapat Mereka                    |
|                                    |
| +--------------------------------+ |
| | "Beli kertas HVS kemahalan.."  | |
| | (A) Amelia S. - Informatika    | |
| +--------------------------------+ |
| +--------------------------------+ |
| | "SSO Kampus aman ga ditipu.."  | |
| | (R) Rian F. - Elektro          | |
| +--------------------------------+ |
|                                    |
| ====== FAQ (Accordion) ======      |
| Pertanyaan Umum                    |
|                                    |
| > Apakah Guest bisa melihat?   [v] |
| > Bagaimana metode bayar?      [v] |
| > Apakah ada biaya admin?      [v] |
|                                    |
| ====== CTA BANNER ======           |
| Siap Hemat Bersama Teman Kampus?   |
| Mulai cari barang patungan...      |
| [ Masuk Katalog Patungan &rarr; ]  |
|                                    |
| ====== FOOTER ======               |
| © 2026 TemanBeli. Built for Closed |
| Campus Ecosystem.                  |
|                                    |
| Eksplor Feed | Fitur | FAQ         |
+------------------------------------+
```

---

## 3. Eksplor (`eksplor.html`)

```text
+------------------------------------+
| 🎓 PatunganAja!           [🌙] [=] |
+------------------------------------+
| Katalog Patungan Aktif             |
| Cari penawaran barang grosir...    |
|                                    |
| [ + Buat Patungan Baru ]           |
|                                    |
| [ 🔍 Cari barang atau titik... ]   |
|                                    |
| Filter: [Semua] [📚 Alat Tulis]    |
|         [🧪 Praktikum] [🍿 Makanan]|
|                                    |
| ====== FEED CARDS ======           |
| +--------------------------------+ |
| | [ GAMBAR THUMBNAIL BARANG ]    | |
| | (Badge Kategori) (Badge Status)| |
| |                                | |
| | Judul Barang Patungan          | |
| | Progress: 3/5 Terisi [=====  ] | |
| |                                | |
| | Harga Patungan: Rp 15.000/org  | |
| | Kreator: (Avatar) Nama         | |
| +--------------------------------+ |
|                                    |
| +--------------------------------+ |
| | [ GAMBAR THUMBNAIL BARANG ]    | |
| | (Badge Kategori) (Badge Status)| |
| |                                | |
| | Judul Barang Lainnya           | |
| | Progress: 2/2 Penuh  [=======] | |
| |                                | |
| | Harga Patungan: Rp 20.000/org  | |
| | Kreator: (Avatar) Nama         | |
| +--------------------------------+ |
|                                    |
| ====== FOOTER ======               |
| © 2026 TemanBeli...                |
+------------------------------------+
```

---

## 4. Detail Patungan (`detail.html`)

```text
+------------------------------------+
| 🎓 PatunganAja!           [🌙] [=] |
+------------------------------------+
|                                    |
| [ GAMBAR BARANG UKURAN PENUH ]     |
|                                    |
| Kertas A4 1 Rim (Badge Kategori)   |
| Rp 75.000 Total                    |
|                                    |
| Estimasi Harga per Slot:           |
| Rp 15.000                          |
|                                    |
| ====== DESKRIPSI ======            |
| Beli kertas buat tugas akhir.      |
|                                    |
| ====== CATATAN KREATOR ======      |
| Titik kumpul di depan perpus.      |
|                                    |
| ====== STATUS & ANGGOTA ======     |
| Slot Terisi: 3 dari 5 Orang        |
| [==========          ] 60%         |
|                                    |
| Partisipan:                        |
| 1. (A) Amelia S. (Kreator)         |
| 2. (B) Budi                        |
| 3. (C) Citra                       |
|                                    |
| [ 💬 Hubungi Kreator via WhatsApp ]|
| ATAU                               |
| [ 🔒 Masuk SSO Kampus untuk Ikut ] |
|                                    |
| ====== LOG PEMBARUAN ======        |
| 📢 Log Pembaruan Status            |
| (Khusus Kreator)                   |
|                                    |
| - 2026-09-30:                      |
|   Barang sudah di-checkout!        |
|                                    |
| [ Tambah update... ] [ Kirim ]     |
|                                    |
| ====== FOOTER ======               |
| © 2026 TemanBeli...                |
+------------------------------------+
```

---

## 5. Buat Patungan Baru (`create.html`)

```text
+------------------------------------+
| 🎓 PatunganAja!           [🌙] [=] |
+------------------------------------+
| Buat Patungan Baru                 |
|                                    |
| Judul Barang                       |
| [ Contoh: Kertas HVS 1 Rim       ] |
|                                    |
| Kategori                           |
| [ Pilih Kategori v               ] |
|                                    |
| Harga Total Grosir                 |
| [ Rp 75000                       ] |
|                                    |
| Target Jumlah Anggota              |
| [ 5                              ] |
|                                    |
| URL Gambar Referensi               |
| [ https://...                    ] |
|                                    |
| Catatan Kreator / Deskripsi        |
| [ Tolong tepat waktu bayarnya..  ] |
|                                    |
| Area Titik Kumpul (Tikum)          |
| [ Kantin Fakultas / Perpus       ] |
|                                    |
|      [ Batal ] [ Buat Patungan ]   |
|                                    |
| ====== FOOTER ======               |
| © 2026 TemanBeli...                |
+------------------------------------+
```

---

## 6. Info Kampus & Komunitas (`infokomun.html`)

```text
+------------------------------------+
| 🎓 PatunganAja!           [🌙] [=] |
+------------------------------------+
| Info Kampus & Direktori Komunitas  |
| Baca info terbaru dari ormawa...   |
|                                    |
| [ 🔍 Cari Info...                ] |
|                                    |
| ====== LIST INFO ======            |
| +--------------------------------+ |
| | [Badge INFO]                   | |
| | BEM: Donasi Buku Bekas Smt Ini | |
| | Pengumpulan di lobi gedung...  | |
| +--------------------------------+ |
|                                    |
| +--------------------------------+ |
| | [Badge PROMO]                  | |
| | Fotokopi Berkah: Diskon 20%    | |
| | Cukup tunjukkan KTM...         | |
| +--------------------------------+ |
|                                    |
| ====== FOOTER ======               |
| © 2026 TemanBeli...                |
+------------------------------------+

(Modal / Pop-up Saat Info Diklik)
+------------------------------------+
| [ Judul Lengkap Info ]         [X] |
| ---------------------------------- |
| Penjelasan detail mengenai event   |
| atau promo yang sedang             |
| berlangsung.                       |
+------------------------------------+
```

---

## 7. Profil User (`profil.html`)

```text
+------------------------------------+
| 🎓 PatunganAja!           [🌙] [=] |
+------------------------------------+
| ====== HEADER PROFIL ======        |
|      ( Avatar / Foto )             |
|       Amelia Salsabila             |
|      Sistem Informasi 2021         |
|                                    |
| [ ✏️ Edit Profil ]                 |
|                                    |
| ====== KONTEN PROFIL ======        |
| Tab:                               |
| [Riwayat Aktif] [Selesai] [Ulasan] |
|                                    |
| (Tampilan Tab Riwayat Aktif)       |
| Daftar Patungan yang Diikuti:      |
| +--------------------------------+ |
| | [Gambar] Kertas A4 1 Rim       | |
| | Rp 15.000 (3/5 Terisi)         | |
| +--------------------------------+ |
|                                    |
| (Tampilan Tab Ulasan)              |
| Ulasan dari Teman Kampus:          |
| +--------------------------------+ |
| | (B) Budi (Bintang 5)           | |
| | "Amelia gercep banget baliknya"| |
| +--------------------------------+ |
|                                    |
| ====== FOOTER ======               |
| © 2026 TemanBeli...                |
+------------------------------------+
```
