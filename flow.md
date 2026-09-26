# User Flow Aplikasi Patungan Mahasiswa

Dokumen ini memuat alur perjalanan pengguna (User Flow) dari awal mengakses aplikasi hingga proses patungan selesai. Tidak ada detail teknis, khusus berfokus pada pengalaman pengguna.

## Peran & Tingkat Akun Pengguna
Sistem ini menggunakan konsep "Closed Campus Ecosystem" demi keamanan, dengan pembagian peran sebagai berikut:
1. Pengunjung (Guest): Pengguna yang belum login. Bisa melihat daftar pengumuman dan membaca detail barang, namun tidak bisa melakukan aksi ikut patungan.
2. Akun Verified (Login SSO Kampus): Pengguna utama. Bisa menjadi Partisipan (ikut patungan) dan Kreator (membuat pengumuman/koordinator). Memiliki lencana "Verified Mahasiswa".
3. (Catatan Pertimbangan Masa Depan: Akun Unverified / Login Gmail Umum. Jika kelak diaktifkan untuk memperluas pengguna, akun jenis ini hanya diizinkan menjadi Partisipan dan dilarang membuat pengumuman demi mencegah penipuan oleh pihak luar).

---

## Fase 1: Eksplorasi (Guest View)
1. Pengguna membuka website aplikasi.
2. Pengguna langsung melihat Halaman Utama (Beranda) yang berisi daftar (feed) ringkasan pengumuman.
3. Pengguna mengklik salah satu kartu pengumuman untuk masuk ke Halaman Detail.
4. Di Halaman Detail, pengunjung (Guest) dapat melihat informasi berikut:
   - Nama barang & Kategori.
   - Progress Kuota: Ditampilkan secara visual beserta satuannya (misal: "Terkumpul 2/10 meter" atau progress bar yang sudah terisi sebagian oleh porsi Kreator).
   - Sisa kuota yang masih tersedia untuk diambil Partisipan.
   - Estimasi Harga per Satuan: (Misal: "Rp 5.000 / meter", hasil pembagian otomatis dari sistem).
   - Estimasi Area / Titik Kumpul (Gambaran awal lokasi serah terima).
   - Batas waktu (Deadline).
   - Catatan Tambahan: (Contoh: "Beli di toko offline Manggala" atau "Butuh warna hitam").
   - Link Referensi: (Tautan e-commerce barang asli atau tautan Google Drive untuk foto referensi).
5. Identitas lengkap Kreator dan nomor WhatsApp disembunyikan dari Guest untuk privasi. Tombol interaksi tetap terlihat namun dikunci (gated).

## Fase 2: Masuk Aplikasi (Gated Action & Login)
1. Ketika Pengunjung (Guest) mencoba mengklik tombol aksi, sistem menampilkan pop-up peringatan: "Masuk dulu yuk untuk lanjut!"
2. Pengguna diarahkan ke halaman login dengan opsi utama Masuk dengan Email Kampus (SSO).
   - (Catatan Pertimbangan Masa Depan: Tombol "Masuk dengan Google Umum" bisa ditambahkan di sini jika fitur Akun Unverified sudah diputuskan untuk dirilis).
3. Setelah berhasil login, pengguna dikembalikan ke halaman detail tempat mereka sebelumnya berada.

## Fase 3: Membuat Pengumuman (Khusus Akun Verified/Kreator)
1. Kreator mengklik tombol "Buat Patungan Baru".
2. Kreator mengisi formulir yang berisi:
   - Nama barang yang ingin dibeli.
   - Satuan Barang: Input teks bebas (misal: meter, lembar, kg, lusin).
   - Total Target Pembelian: Total minimal beli yang disyaratkan toko (misal: 10).
   - Total Harga Barang: Harga keseluruhan untuk target di atas (misal: Rp 50.000). Sistem otomatis menghitung harga per satuan (Rp 50.000 / 10) untuk ditampilkan di Halaman Detail.
   - Porsi Kreator: Jumlah yang akan dipakai oleh Kreator sendiri (misal: 2). Sistem otomatis menghitung ini sebagai "progress awal" patungan.
   - Estimasi Area / Titik Kumpul (Contoh: "Kantin Teknik").
   - Batas waktu pencarian patungan.
   - Catatan Tambahan (Opsional): Penjelasan spesifik barang, warna, atau lokasi toko jika beli offline.
   - Link Referensi (Opsional): Tautan e-commerce, Google Maps (untuk toko offline), atau Google Drive (untuk foto referensi).
   - Nomor WhatsApp (hanya dipanggil sistem saat tombol diklik, tidak dipajang ke publik).
3. Kreator menekan tombol "Posting".
4. Pengumuman tayang di Halaman Utama dengan status kuota yang sudah memiliki progress dan harga per satuan yang sudah terhitung rapi.

## Fase 4: Bergabung Patungan (Sebagai Partisipan)
1. Partisipan mencari barang yang dibutuhkan dan yang estimasi areanya terjangkau.
2. Partisipan mengklik pengumuman, masuk ke Halaman Detail.
3. Website menyediakan tombol untuk mengarahkan Partisipan ke aplikasi WhatsApp dan membuka ruang obrolan dengan Kreator.
4. Pesan perkenalan dan niat patungan sudah terisi otomatis (template), partisipan tinggal menekan tombol kirim.

## Fase 5: Koordinasi & Serah Terima (Di Luar Aplikasi Web)
1. Kesepakatan Akhir: Kreator dan Partisipan mengobrol di WhatsApp untuk menyepakati jumlah pesanan partisipan, total harga, metode pembayaran, serta mendiskusikan titik kumpul (tikum) pasti.
2. Update Status: Kreator kembali ke aplikasi web untuk memperbarui sisa kuota (jika Partisipan jadi mengambil sisa porsi).
3. Pembayaran: Partisipan mentransfer uang ke rekening/e-wallet Kreator.
4. Pembelian: Kreator membelikan barang tersebut (secara online atau offline).
5. Serah Terima: Setelah barang tiba, Kreator dan Partisipan bertemu di lokasi yang sudah disepakati di WhatsApp untuk membagikan barang.

---

## Ide Fitur Eksperimental (Belum Digabungkan ke Alur Utama)

Bagian ini berisi konsep fitur tambahan yang berfokus pada transparansi, validasi, dan reputasi pengguna.

1. Sistem Daftar, ACC, dan Pelaporan (Validasi & Keamanan Partisipan)
- Kewajiban Daftar: Untuk ikut patungan, Partisipan diwajibkan menekan tombol "Daftar Patungan" di web. Akun mereka akan masuk ke dalam status "Menunggu" (Pending) di dashboard Kreator.
- Tombol Diskusi WA: Selagi bimbang atau menunggu direspons, Partisipan disediakan tombol terpisah "Tanya via WA" untuk berdiskusi dengan Kreator.
- Syarat ACC oleh Kreator: Setelah Partisipan sepakat dan mentransfer uang di WhatsApp, Kreator wajib menanyakan username Partisipan. Kreator kemudian harus membuka dashboard web dan menekan tombol "ACC" (Approve) pada nama Partisipan tersebut agar resmi tergabung dalam kuota.
- Fitur Pelaporan Admin: Jika Partisipan sudah transfer, namun Kreator sengaja tidak melakukan ACC di web, Partisipan dapat melaporkan Kreator tersebut ke email Admin dengan melampirkan bukti chat dan transfer.

2. Kolom Reply ala Thread X (Pengganti Fitur Edit)
- Menjaga Kredibilitas: Detail utama di awal pembuatan post (harga, kuota, deskripsi) bersifat permanen dan tidak bisa diedit.
- Sistem Reply Satu Arah: Halaman Detail dilengkapi dengan kolom balasan (reply) di bagian bawah layaknya thread atau utas di media sosial X. Akses untuk menambah balasan ini dikunci eksklusif hanya untuk Kreator.
- Log Pembaruan: Kreator menggunakan kolom ini murni untuk memberikan informasi pembaruan secara kronologis (misal: "Batas waktu diperpanjang ya" atau "Barang sudah dibeli, tunggu update resi"). Hal ini efektif mencegah halaman menjadi penuh atau terkena spam dari pengguna lain.

3. Penutupan Event & Bukti Keberhasilan (Proof of Action)
- Syarat Penutupan: Saat barang sudah dibagikan, Kreator diwajibkan menekan tombol "Tutup Patungan Selesai".
- Validasi Link Drive: Untuk mengamankan reputasi sistem, Kreator diminta menempelkan tautan (link) Google Drive yang berisi foto bukti (misalnya foto nota pembelian, atau foto saat serah terima).
- Tautan atau folder Google Drive ini kemudian dapat ditampilkan di halaman profil Kreator, berfungsi sebagai galeri portofolio transaksi yang berhasil.

4. Sistem Reputasi dan Like Terintegrasi
- Urutan Validasi: Fitur ini hanya aktif setelah Kreator menyelesaikan tahap nomor 3 (mengunggah bukti dan menutup event secara resmi).
- Notifikasi Otomatis: Sistem kemudian mengirimkan notifikasi khusus ke akun Partisipan yang berstatus sudah di-ACC (dari tahap nomor 1).
- Pemberian Kudos Opsional: Notifikasi ini berisi ajakan bagi Partisipan valid tersebut untuk memberikan Like atau Kudos ke profil Kreator. Sistem ini sepenuhnya kebal dari manipulasi karena Like hanya bisa diberikan setelah siklus patungan benar-benar ditutup dengan bukti yang sah.
