import rateLimit from 'express-rate-limit';

// Peta (mapping) batas rate limit berdasarkan key/nama fungsi
const limitsConfig = {
  // === GLOBAL / HEALTH ===
  'health.check': { windowMs: 15 * 60 * 1000, limit: 100 },
  'seed.database': { windowMs: 60 * 60 * 1000, limit: 5 }, // 5 kali per jam untuk cegah abuse

  // === AUTH ROUTER ===
  'auth.loginGoogle': { windowMs: 15 * 60 * 1000, limit: 5 },
  'auth.loginManual': { windowMs: 15 * 60 * 1000, limit: 5 },
  'auth.refresh': { windowMs: 15 * 60 * 1000, limit: 20 },
  'auth.logout': { windowMs: 15 * 60 * 1000, limit: 20 },

  // === USER ROUTER ===
  'user.getProfile': { windowMs: 15 * 60 * 1000, limit: 100 },
  'user.updateProfile': { windowMs: 15 * 60 * 1000, limit: 15 },
  'user.getReviews': { windowMs: 15 * 60 * 1000, limit: 100 },

  // === PATUNGAN ROUTER ===
  'patungan.getAll': { windowMs: 15 * 60 * 1000, limit: 300 },
  'patungan.getDetail': { windowMs: 15 * 60 * 1000, limit: 300 },
  'patungan.create': { windowMs: 60 * 60 * 1000, limit: 10 },
  'patungan.update': { windowMs: 60 * 60 * 1000, limit: 15 },
  'patungan.addLog': { windowMs: 60 * 60 * 1000, limit: 20 },
  'patungan.join': { windowMs: 60 * 60 * 1000, limit: 10 },
  'patungan.finish': { windowMs: 60 * 60 * 1000, limit: 15 },
  'patungan.updateStatus': { windowMs: 60 * 60 * 1000, limit: 15 },
  'patungan.getParticipants': { windowMs: 15 * 60 * 1000, limit: 100 },
  'patungan.updateParticipantStatus': { windowMs: 60 * 60 * 1000, limit: 15 },
  'patungan.deleteParticipant': { windowMs: 60 * 60 * 1000, limit: 15 },
  'patungan.addReview': { windowMs: 60 * 60 * 1000, limit: 10 },

  // === HISTORY ROUTER ===
  'history.getAll': { windowMs: 15 * 60 * 1000, limit: 300 },
  'history.getSummary': { windowMs: 15 * 60 * 1000, limit: 100 },

  // === COMMUNITY ROUTER ===
  'community.create': { windowMs: 60 * 60 * 1000, limit: 5 },
  'community.getAll': { windowMs: 15 * 60 * 1000, limit: 300 },
  'community.getDetail': { windowMs: 15 * 60 * 1000, limit: 300 },
  'community.addComment': { windowMs: 15 * 60 * 1000, limit: 15 },
  'community.toggleLike': { windowMs: 5 * 60 * 1000, limit: 50 }
};

// Cache instance limiter agar tidak dibuat berulang kali per request
const limiters = {};

/**
 * Global Rate Limiter Middleware
 * @param {string} key - Kunci konfigurasi yang harus terdaftar di limitsConfig
 */
export const rateLimiter = (key) => {
  // Jika instance sudah pernah dibuat, gunakan ulang
  if (limiters[key]) return limiters[key];

  const config = limitsConfig[key];
  if (!config) {
    throw new Error(`FATAL ERROR: Rate limit config for key '${key}' is missing!`);
  }
  
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
