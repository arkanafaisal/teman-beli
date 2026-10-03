import { MOCK_ENDPOINTS } from "./mockConfig";

// Flag global untuk mencegah infinite loop ketika auto-refresh token
let isRefreshing = false;

/**
 * Fungsi asli Fetch API
 * Disiapkan untuk langsung berjalan (production-ready) ketika di-uncomment.
 * 
 * @param {string} path Endpoint tanpa Base URL
 * @param {string} method HTTP Method
 * @param {object} body Payload data
 * @param {boolean} isRetry Penanda apakah ini pemanggilan retry setelah auto-refresh
 */
export const baseFetch = async (path, method = "GET", body = null, isRetry = false) => {
  // const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  
  const options = {
    method,
    credentials: "include", // Otomatis mengirim cookies (termasuk session/refresh token)
    headers: {
      "Content-Type": "application/json"
    }
  };
  
  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  let success = false;
  let code = 500;
  let payload = null;
  let message = null;

  try {
    // --- [PRODUCTION CODE] ---
    // Uncomment blok di bawah ketika backend sudah siap
    /*
    const res = await fetch(`${BASE_URL}${path}`, options);
    const contentType = res.headers.get("content-type");
    
    success = res.ok;
    code = res.status;
    
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      payload = data.payload !== undefined ? data.payload : data;
      message = data.message || null;
    }
    */

    // --- [MOCK SIMULATOR OVERRIDE] ---
    // Karena masih mock, hasil fetch asli ditimpa menggunakan simulator
    const mockRes = await simulateMockResponse(path, method);
    success = mockRes.success;
    code = mockRes.code;
    payload = mockRes.payload;
    message = mockRes.message;


    // --- [AUTO REFRESH TOKEN LOGIC] ---
    // Jika 401 Unauthorized, otomatis tembak endpoint refresh (Hanya 1 kali, cegah loop)
    if (code === 401 && !isRetry && path !== "/auth/refresh" && path !== "/auth/login") {
      if (!isRefreshing) {
        isRefreshing = true;
        // Panggil refresh token tanpa melepas blok baseFetch utama
        const refreshRes = await baseFetch("/auth/refresh", "POST", null, true);
        isRefreshing = false;
        
        if (refreshRes.success) {
          // Jika refresh sukses, ulangi request aslinya (retry)
          return await baseFetch(path, method, body, true);
        }
      } 
      // Jika ternyata sedang isRefreshing oleh request lain di waktu yg sama, 
      // idealnya di production kita pakai Queue/Promise penahan.
      // Di mock ini kita lepaskan saja sebagai 401.
    }

  } catch (err) {
    success = false;
    code = 500;
    message = "Gagal terhubung ke server.";
  }

  return {
    success,
    code,
    payload,
    message
  };
};

// =====================================================================
// HELPER BOHONGAN (MOCK RANDOMIZER)
// =====================================================================
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const simulateMockResponse = async (path, method) => {
  // 1. Simulasi Delay Network
  await sleep(Math.floor(Math.random() * 500) + 300);

  // 2. Normalisasi Path dinamis (misal /patungan/123 -> /patungan/:id)
  let configPath = path;
  if (path.match(/\/patungan\/\d+/)) {
    configPath = path.replace(/\/\d+.*/, (match) => match.includes("comments") ? "/:id/comments" : match.includes("join") ? "/:id/join" : "/:id");
  }
  if (path.match(/\/community\/\d+/)) {
    configPath = path.replace(/\/\d+.*/, (match) => match.includes("comments") ? "/:id/comments" : match.includes("join") ? "/:id/join" : "/:id");
  }

  const mockConfig = MOCK_ENDPOINTS[configPath] || MOCK_ENDPOINTS.default;
  const possibleCodes = mockConfig[method] || mockConfig.GET || [200, 404, 500];
  
  // 3. Ambil kode HTTP secara acak
  const randomCode = possibleCodes[Math.floor(Math.random() * possibleCodes.length)];
  const isSuccess = randomCode >= 200 && randomCode < 300;

  let payload = null;
  if (isSuccess && mockConfig.mockPayload) {
    payload = mockConfig.mockPayload;
  }

  return {
    success: isSuccess,
    code: randomCode,
    payload: payload,
    message: null
  };
};
