import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './routes/auth.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Validasi Environment Variables Kritis (Early Crash)
const requiredEnv = ['GOOGLE_CLIENT_ID', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];
for (const envVar of requiredEnv) {
  if (!process.env[envVar]) {
    console.error(`FATAL ERROR: Environment variable ${envVar}`);
    process.exit(1);
  }
}

// Middleware CORS (Penting untuk mengatasi block origin di localhost)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Agar cookies/token bisa dikirim antar port
}));

// Middleware parsing request body & cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware penanganan error saat gagal parsing JSON (malformed request)
app.use((err, req, res, next) => {
  // express.json() akan melemparkan SyntaxError jika JSON rusak
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.sendStatus(400)
  }
  next();
});

// Pendaftaran Router Utama
app.use('/api/auth', authRouter);

// Route awal (health check)
app.get('/api/health', (req, res) => {
  res.sendStatus(200)
});

// Global Error Handler
// Menangkap semua error (termasuk dari async handler yang tidak di-try-catch)
app.use((err, req, res, next) => {
  console.error("❌ Terjadi Error:", err);
  const status = err.status || 500;

  // Sesuai aturan: Jika ada field 'customPayload', kirim JSON (untuk membedakan error yang overlap kode HTTP-nya)
  if (err.customPayload) {
    return res.status(status).json(err.customPayload);
  }

  // Jika tidak, hanya kirimkan kode HTTP saja
  res.sendStatus(status);
});

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});
