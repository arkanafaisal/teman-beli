import rateLimit from 'express-rate-limit';

// Peta (mapping) batas rate limit berdasarkan key/nama fungsi
const limitsConfig = {
  'auth.login': { 
    windowMs: 15 * 60 * 1000, // 15 menit
    limit: 5
  },
  'auth.refresh': { 
    windowMs: 15 * 60 * 1000,
    limit: 20
  },
  'auth.logout': { 
    windowMs: 15 * 60 * 1000,
    limit: 20
  },
  'patungan.create': { 
    windowMs: 60 * 60 * 1000, // 1 jam
    limit: 10
  },
  'patungan.update': { 
    windowMs: 60 * 60 * 1000, 
    limit: 15
  },
  'patungan.addLog': { 
    windowMs: 60 * 60 * 1000,
    limit: 20
  },
  'community.create': { 
    windowMs: 60 * 60 * 1000,
    limit: 5
  },
  'user.update': {
    windowMs: 15 * 60 * 1000,
    limit: 10
  },
  'api.get': { 
    windowMs: 15 * 60 * 1000, 
    limit: 300 // Operasi GET butuh limit lebih besar
  },
  'default': { 
    windowMs: 15 * 60 * 1000, 
    limit: 100
  }
};

// Cache instance limiter agar tidak dibuat berulang kali per request
const limiters = {};

/**
 * Global Rate Limiter Middleware
 * @param {string} key - Kunci konfigurasi, misal: 'auth.login'
 */
export const rateLimiter = (key) => {
  // Jika instance sudah pernah dibuat, gunakan ulang
  if (limiters[key]) return limiters[key];

  const config = limitsConfig[key] || limitsConfig['default'];
  
  const limiter = rateLimit({
    windowMs: config.windowMs,
    limit: config.limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (req, res, next, options) => {
      res.sendStatus(429);
    }
  });

  // Simpan ke cache
  limiters[key] = limiter;
  return limiter;
};
