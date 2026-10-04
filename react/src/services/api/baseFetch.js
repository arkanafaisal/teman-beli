// Flag global untuk mencegah infinite loop ketika auto-refresh token
let isRefreshing = false;

/**
 * Fungsi asli Fetch API (Pure Production)
 *
 * @param {string} path Endpoint tanpa Base URL
 * @param {string} method HTTP Method
 * @param {object} body Payload data
 * @param {boolean} isRetry Penanda apakah ini pemanggilan retry setelah auto-refresh
 */
export const baseFetch = async (path, method = "GET", body = null, isRetry = false) => {
  // Gunakan import.meta.env.PROD agar transparan antara Dev dan Build
  const BASE_URL = import.meta.env.PROD ? "/api" : "http://localhost:3000/api";

  const options = {
    method,
    credentials: "include", // Otomatis mengirim cookies HTTP-Only (Access/Refresh Token)
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
    const res = await fetch(`${BASE_URL}${path}`, options);
    const contentType = res.headers.get("content-type");

    success = res.ok;
    code = res.status;

    // Hanya parsing jika responsenya berupa JSON (bukan status code polosan)
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      payload = data.payload !== undefined ? data.payload : data;
      message = data.message || null;
    }

    // --- [AUTO REFRESH TOKEN LOGIC] ---
    // Jika 401 Unauthorized, otomatis tembak endpoint refresh (Hanya 1 kali, cegah loop)
    if (code === 401 && !isRetry && path !== "/auth/refresh" && path !== "/auth/login") {
      if (!isRefreshing) {
        isRefreshing = true;
        // Panggil refresh token
        const refreshRes = await baseFetch("/auth/refresh", "POST", null, true);
        isRefreshing = false;

        if (refreshRes.success) {
          // Jika refresh sukses (dapat access_token baru), ulangi request aslinya (retry)
          return await baseFetch(path, method, body, true);
        }
      }
    }

  } catch (err) {
    console.error("Fetch Error:", err);
    success = false;
    code = 500;
  }

  return {
    success,
    code,
    payload,
    message
  };
};
