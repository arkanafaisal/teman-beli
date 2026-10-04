import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AuthController = {};

// Inisialisasi Google Client (Client ID nanti diambil dari .env)
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function untuk set HTTP-Only cookie
const setHttpCookie = (res, name, value, maxAge) => {
  res.cookie(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: maxAge, // dalam milidetik
  });
};

AuthController.login = async (req, res) => {
  const { credential } = req.body; // Token yang didapat dari frontend (Google Login)

  if (!credential) {
    return res.sendStatus(400); // Bad Request jika tidak ada token
  }

  // 1. Verifikasi token ke Google
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  
  const payload = ticket.getPayload();
  const { email, name, sub: googleId } = payload;

  // 2. Validasi Domain Kampus (contoh: .ac.id atau .edu)
  // Jika frontend sudah memblokirnya, ini sebagai lapis pertahanan kedua
  if (!email.endsWith('.ac.id')) {
    let err = new Error("Bukan email kampus");
    err.status = 403;
    throw err; // Akan ditangkap global error handler, menghasilkan res.sendStatus(403)
  }

  // 3. Find or Create User di Database
  let user = await prisma.user.findUnique({
    where: { email: email }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: email,
        name: name
      }
    });
  }

  // 4. Generate JWT (Access Token 15 menit, Refresh Token 7 hari)
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // 5. Simpan ke dalam HTTP-Only Cookies
  setHttpCookie(res, 'access_token', accessToken, 15 * 60 * 1000); 
  setHttpCookie(res, 'refresh_token', refreshToken, 7 * 24 * 60 * 60 * 1000); 

  res.sendStatus(200);
};

AuthController.logout = async (req, res) => {
  // Hapus cookie
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.sendStatus(200);
};

AuthController.refresh = async (req, res) => {
  const { refresh_token } = req.cookies;

  if (!refresh_token) {
    return res.sendStatus(401);
  }

  try {
    // Verifikasi refresh token valid dan belum expired
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    
    // Cari user di Database menggunakan decoded.id untuk memastikan akun belum dihapus/di-banned
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      return res.sendStatus(401);
    }

    // Terbitkan Access Token yang baru
    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    setHttpCookie(res, 'access_token', newAccessToken, 15 * 60 * 1000);
    res.sendStatus(200);

  } catch (error) {
    // Jika JWT expired atau tidak valid (pemalsuan)
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.sendStatus(401);
  }
};