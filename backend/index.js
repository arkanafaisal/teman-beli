import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import patunganRouter from './routes/patungan.route.js';
import historyRouter from './routes/history.route.js';
import communityRouter from './routes/community.route.js';
import { rateLimiter } from './middlewares/rateLimiter.js';

const app = express();

// WAJIB KARENA CLOUDFLARE TUNNEL (Reverse Proxy)
// Ini membuat express-rate-limit membaca IP asli user, bukan IP localhost/Cloudflare
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
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
app.use('/api/users', userRouter);
app.use('/api/patungan', patunganRouter);
app.use('/api/history', historyRouter);
app.use('/api/community', communityRouter);

// Route awal (health check)
app.get('/api/health', rateLimiter('health.check'), (req, res) => {
  res.sendStatus(200)
});

// Serve Frontend di Production
if (process.env.NODE_ENV === 'production') {
  const reactDistPath = path.join(__dirname, '../react/dist');
  app.use(express.static(reactDistPath));
  
  // Catch-all route untuk React Router (SPA)
  // Abaikan request ke /api agar backend tetap melempar 404/error yang sesuai
  app.get(/(.*)/, (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(reactDistPath, 'index.html'));
  });
}

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
