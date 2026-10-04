direktori yang boleh kamu edit/write adalah /react/, jangan menyentuh bagian lain kecuali disuruh, hanya boleh read saja.


saya selalu mengawasi diff dengan git, commit saya harus bersih dari update yang tidak relevan, jadi pastikan eksekusimu hanyalah yang disuruh saja.


jangan sentuh git write sama sekali, kalau read boleh. yang melakukan commit, push, reset, dll adalah saya, bukan kamu.


pastikan seluruh edit frontend yang kamu lakukan mengutamakan mobile user. Ini adalah project mobile first, target usernya lebih sering membuka dengan hp daripada laptop maupun pc. boleh kalau mau responsive, tapi jangan sampai merembet ke mobile layout, utamakan yang mobile.


sebisa mungkin backend hanya mengirim httpcode saja, jadi hanya sendStatus. karena dari path atau endpoint dan methodnya (beserta httpcode) sudah jelas bisa menentukan pesan kesalahannya. kecuali kalau memang ditemukan ada 2 kondisi endpoint dan method dengan httpcode yang sama, barulah kamu boleh mengirimkan json body dengan kode pesan kesalahannya, bukan string message mentah, tapi kode yang disepakati oleh mapper frontend.

