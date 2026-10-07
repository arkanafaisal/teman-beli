import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { rateLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();
const prisma = new PrismaClient();

// Helper function untuk mengambil elemen acak dari array
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Data Array untuk Randomisasi
const patunganTitles = {
  PANGAN: ["Patungan Beli Beras 10kg", "Patungan Galon Aqua Isi Ulang", "Pesan Pizza Domino Buy 1 Get 1", "Patungan Nasi Padang Lauk Rendang Jumbo", "Beli Mie Instan Sekardus Bareng"],
  KOS: ["Sewa Kulkas Kosan Bareng", "Beli Rice Cooker Baru", "Patungan Bayar WiFi Kosan", "Beli Kipas Angin Ruang TV", "Patungan Sabun & Pembersih Lantai"],
  KAMPUS: ["Print Buku Fotocopy", "Beli Akun Jurnal Premium", "Patungan Zoom Pro Bulanan", "Beli Kertas HVS 1 Rim", "Sewa Studio untuk Tugas Akhir"],
  DIGITAL: ["Netflix Premium 4K", "Spotify Family Plan", "Youtube Premium Family", "Canva Pro Tahunan", "ChatGPT Plus Bulanan"]
};

const patunganNotes = [
  "Yuk join, slot terbatas nih siapa cepat dia dapat!",
  "Patungan buat ngirit pengeluaran bulan ini ya kawan-kawan.",
  "Transfer segera kalau udah join, biar cepat diproses.",
  "Hanya untuk yang serius mau patungan, no hit & run.",
  "Ditunggu sampai besok malam ya, kalau penuh langsung gass!"
];

const communityTitles = {
  MAKAN: ["Ayam Geprek Super Pedas Promo 10k", "Nasi Uduk Malam Porsi Kuli", "Warteg Bahagia Buka 24 Jam", "Soto Daging Diskon Pakai KTM", "Nasi Goreng Babat Terenak di Sini"],
  KAMPUS: ["Fotocopy Murah Depan Gerbang Utama", "Toko Alat Tulis Lengkap Diskon Mahasiswa", "Sewa Kamera Murah buat Tugas", "Servis Laptop Mahasiswa Garansi", "Buku Bekas Jurusan Teknik Harga Miring"],
  KOS: ["Kos Putra Bebas Jam Malam Dekat Kampus", "Kos Putri AC 1 Juta Tinggal Jalan Kaki", "Jasa Laundry Kiloan Wangi Sehari Jadi", "Kost Kamar Mandi Dalam Plus WiFi", "Promo Akhir Tahun Kost Eksklusif"]
};

const communityDescs = [
  "Tempat ini sangat *recommended* banget buat mahasiswa karena harganya murah dan pelayanannya cepat. Cocok banget buat yang lagi akhir bulan atau butuh solusi praktis. Langsung gas cek lokasinya!",
  "Buat kalian yang lagi cari info yang terjangkau, ini jawabannya. Fasilitas lumayan oke dengan harga yang gak bikin kantong jebol. Jangan lupa bawa KTM biar dapet diskon tambahan ya.",
  "Gila sih ini *hidden gem* banget! Sering ke sini kalau lagi butuh. Yang punya juga ramah banget sama mahasiswa. Wajib banget kalian simpan infonya biar gak lupa.",
  "Infonya valid ya guys, sudah dicoba sendiri dan terbukti *worth it*. Jauh lebih hemat daripada tempat lain di sekitaran sini. Kapan-kapan kita bareng ke sana!"
];

const locations = ["Kutek (Kukusan Teknik)", "Kukusan Kelurahan", "Barel", "Pondok Cina", "Jalan Margonda Raya", "Area Kampus Dalam", "Dekat Stasiun UI"];

// Route khusus Seed Database
router.get('/', rateLimiter('seed.database'), async (req, res) => {
  const seedPassword = process.env.SEED_PASSWORD;

  if (!seedPassword) {
    return res.status(500).json({ error: "Variabel SEED_PASSWORD belum di-set di .env" });
  }

  if (req.query.password !== seedPassword) {
    return res.status(401).json({ error: "Password seed salah!" });
  }

  try {
    // Menggunakan Interactive Transaction agar semuanya sukses atau di-rollback jika gagal
    await prisma.$transaction(async (tx) => {

      // 1. Bersihkan semua data terlebih dahulu
      await tx.communityLike.deleteMany();
      await tx.communityComment.deleteMany();
      await tx.community.deleteMany();
      await tx.review.deleteMany();
      await tx.patunganLog.deleteMany();
      await tx.patunganParticipant.deleteMany();
      await tx.patungan.deleteMany();
      await tx.user.deleteMany();

      // 2. Buat 5 User Testing
      const hashedPassword = await bcrypt.hash("password123", 10);
      const usersData = [
        { name: "Testing Satu", email: "testing1@student.uns.ac.id", password: hashedPassword, department: "Informatika UI", rating: 4.9, reviewCount: 12 },
        { name: "Testing Dua", email: "testing2@student.uns.ac.id", password: hashedPassword, department: "Sistem Informasi UI", rating: 5.0, reviewCount: 8 },
        { name: "Testing Tiga", email: "testing3@student.uns.ac.id", password: hashedPassword, department: "Teknik Komputer UI", rating: 4.8, reviewCount: 24 },
        { name: "Testing Empat", email: "testing4@student.uns.ac.id", password: hashedPassword, department: "Ilmu Komputer UI", rating: 4.9, reviewCount: 5 },
        { name: "Testing Lima", email: "testing5@student.uns.ac.id", password: hashedPassword, department: "Teknik Elektro UI", rating: 4.7, reviewCount: 19 }
      ];

      const createdUsers = [];
      for (const u of usersData) {
        createdUsers.push(await tx.user.create({ data: u }));
      }

      // 3. Buat 10 Patungan dengan data dinamis
      const patunganCats = ['PANGAN', 'KOS', 'KAMPUS', 'DIGITAL'];
      for (let i = 0; i < 10; i++) {
        const host = getRandom(createdUsers);
        const category = getRandom(patunganCats);
        const title = getRandom(patunganTitles[category]);

        await tx.patungan.create({
          data: {
            title: `${title} #${i + 1}`,
            category: category,
            unit: category === 'DIGITAL' ? "Bulan" : "Orang",
            targetQuota: Math.floor(Math.random() * 4) + 2, // 2 sampai 5
            totalPrice: (Math.floor(Math.random() * 10) + 2) * 20000, // Harga acak
            currentQuota: 1, // host
            area: getRandom(locations),
            deadline: new Date(Date.now() + 86400000 * (Math.floor(Math.random() * 7) + 1)), // +1 s/d 7 hari
            whatsapp: "081234567890",
            notes: getRandom(patunganNotes),
            hostId: host.id,
            status: 'OPEN'
          }
        });
      }

      // 3.5 Buat 5 Patungan FINISHED dengan history dan review
      for (let i = 0; i < 5; i++) {
        const host = getRandom(createdUsers);
        const category = getRandom(patunganCats);
        const title = getRandom(patunganTitles[category]);

        const finishedPatungan = await tx.patungan.create({
          data: {
            title: `${title} (Selesai)`,
            category: category,
            unit: category === 'DIGITAL' ? "Bulan" : "Orang",
            targetQuota: 4,
            totalPrice: 100000,
            currentQuota: 4,
            area: getRandom(locations),
            deadline: new Date(Date.now() - 86400000 * (Math.floor(Math.random() * 5) + 1)), // 1-5 hari lalu
            whatsapp: "081234567890",
            notes: "Sudah selesai diproses.",
            hostId: host.id,
            status: 'FINISHED',
            proofLink: "https://example.com/proof.jpg"
          }
        });

        // Tambahkan partisipan
        const otherUsers = createdUsers.filter(u => u.id !== host.id);
        const participants = otherUsers.slice(0, 3);

        for (const participant of participants) {
          await tx.patunganParticipant.create({
            data: {
              patunganId: finishedPatungan.id,
              userId: participant.id,
              quota: 1,
              status: 'ACCEPTED'
            }
          });

          // Tambahkan ulasan secara acak (80% chance)
          if (Math.random() > 0.2) {
            await tx.review.create({
              data: {
                rating: Math.floor(Math.random() * 2) + 4, // 4 atau 5
                comment: "Mantap, transaksi lancar dan terpercaya! Recommended.",
                reviewerId: participant.id,
                hostId: host.id,
                patunganId: finishedPatungan.id
              }
            });
          }
        }
      }

      // 4. Buat 10 Komunitas dengan data dinamis
      const communityCats = ['MAKAN', 'KAMPUS', 'KOS'];
      const communities = [];
      for (let i = 0; i < 10; i++) {
        const author = getRandom(createdUsers);
        const category = getRandom(communityCats);
        const title = getRandom(communityTitles[category]);

        communities.push(await tx.community.create({
          data: {
            title: `${title} - Mock ${i + 1}`,
            category: category,
            location: getRandom(locations),
            summary: "Info menarik untuk anak kampus, cek selengkapnya di dalam!",
            description: getRandom(communityDescs),
            authorId: author.id
          }
        }));
      }

      // 5. Beri Likes pada Komunitas secara acak
      for (const comm of communities) {
        const numLikes = Math.floor(Math.random() * 3) + 1; // 1 to 3
        const shuffledUsers = [...createdUsers].sort(() => 0.5 - Math.random());

        for (let j = 0; j < numLikes; j++) {
          await tx.communityLike.create({
            data: {
              userId: shuffledUsers[j].id,
              communityId: comm.id
            }
          });
        }
      }
    }, {
      maxWait: 15000,
      timeout: 30000
    }); // Akhir dari transaction

    return res.status(200).json({
      success: true,
      message: "Database berhasil di-seed dengan Transaksi Penuh!",
      details: {
        users: 5,
        patungan: 10,
        community: 10,
        notes: "Gunakan email testing1@student.uns.ac.id s.d. testing5@student.uns.ac.id dengan password 'password123'"
      }
    });

  } catch (error) {
    console.error("SEED ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
