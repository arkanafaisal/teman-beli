direktori yang boleh kamu edit/write adalah /react/, jangan menyentuh bagian lain kecuali disuruh, hanya boleh read saja.


saya selalu mengawasi diff dengan git, commit saya harus bersih dari update yang tidak relevan, jadi pastikan eksekusimu hanyalah yang disuruh saja.


jangan sentuh git write sama sekali, kalau read boleh. yang melakukan commit, push, reset, dll adalah saya, bukan kamu.


pastikan seluruh edit frontend yang kamu lakukan mengutamakan mobile user. Ini adalah project mobile first, target usernya lebih sering membuka dengan hp daripada laptop maupun pc. boleh kalau mau responsive, tapi jangan sampai merembet ke mobile layout, utamakan yang mobile.


sebisa mungkin backend hanya mengirim httpcode saja, jadi hanya sendStatus. karena dari path atau endpoint dan methodnya (beserta httpcode) sudah jelas bisa menentukan pesan kesalahannya. kecuali kalau memang ditemukan ada 2 kondisi endpoint dan method dengan httpcode yang sama, barulah kamu boleh mengirimkan json body dengan kode pesan kesalahannya, bukan string message mentah, tapi kode yang disepakati oleh mapper frontend.


Aturan Implementasi Fitur & API Baru (Backend ke Frontend)

Setiap kali mengimplementasikan API atau fitur baru, kerjakan secara utuh dari backend ke frontend dengan mematuhi aturan berikut:

Respons API Berbasis HTTP Code: Backend harus mengutamakan pengembalian HTTP status code. Jangan merangkai pesan UI (teks) dari backend. Return body hanya diizinkan untuk mengembalikan data esensial atau pesan error spesifik (contoh: konflik data duplikat).

Validasi Request Backend (Zod): Seluruh request backend wajib divalidasi menggunakan Zod. Letakkan schema validasi di dalam folder/file khusus schemas.

Wajib Rate Limit: Terapkan rate limit untuk setiap endpoint baru. Konfigurasikan pada file middleware rate limit middleware.js, lalu pasang sebagai middleware pada tingkat router.

Mapping API (Frontend): Daftarkan endpoint baru beserta method dan parameternya pada file sentralisasi API (misal: api/index.js). Komponen frontend harus memanggil API melalui objek mapping ini.

Mapping Pesan Respons (Frontend): Frontend bertanggung jawab penuh merangkai pesan balasan untuk user. Gunakan objek mapper khusus di frontend yang menerjemahkan kombinasi endpoint, path, dan HTTP code menjadi pesan UI.

Validasi Input Frontend: Seluruh data request atau input form wajib divalidasi terlebih dahulu di frontend menggunakan file validation yang terpisah sebelum dikirim ke API.

Sentralisasi Teks UI (Render Object): Dilarang melakukan hardcode teks pada komponen. Semua teks yang terlihat oleh user (judul, placeholder, pesan, dsb.) wajib disimpan ke dalam render object di folder src/data (kecuali objek mapping pesan API pada poin 5).

Kebijakan Anti-Fallback: Dilarang keras menggunakan nilai/teks fallback untuk mengakali sumber data atau arsitektur yang belum matang. Fallback hanya diizinkan jika secara logika struktural diwajibkan (contoh: pengecekan nilai awal/ initial value untuk membedakan form mode create dan edit).