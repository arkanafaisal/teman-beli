import { baseFetch } from "./baseFetch";
import { getApiMessage } from "./messageMapper";

/**
 * Helper internal untuk mengeksekusi fetch dan menempelkan message yang sesuai
 */
const callApi = async (path, method = "GET", body = null) => {
  const result = await baseFetch(path, method, body);

  if (!result.success && !result.message) {
    result.message = getApiMessage(path, result.code, method);
  }

  if (result.success && !result.message) {
    result.message = getApiMessage(path, result.code, method);
  }

  return result;
};

/**
 * API MAPPING & NAMESPACE
 * Digunakan oleh komponen front-end untuk interaksi backend secara semantik.
 */
export const api = {
  auth: {
    login: ({ credential }) => callApi("/auth/login", "POST", { credential }),
    loginManual: ({ email, password }) => callApi("/auth/login-manual", "POST", { email, password }),
    logout: () => callApi("/auth/logout", "POST"),
    refresh: () => callApi("/auth/refresh", "POST"),
  },
  user: {
    getProfile: () => callApi("/users/profile", "GET"),
    updateProfile: ({ department, password }) => callApi("/users/profile", "PUT", { department, password }),
    deleteProfile: ({ name }) => callApi("/users/profile", "DELETE", { name }),
    getReviews: () => callApi("/users/reviews", "GET"),
    getActivity: () => callApi("/users/activity", "GET"),
    getCommunities: () => callApi("/users/communities", "GET"),
  },
  patungan: {
    getAll: ({ q, category, hostId } = {}) => {
      let query = "";
      const queryParams = new URLSearchParams();
      if (q) queryParams.append("q", q);
      if (category) queryParams.append("category", category);
      if (hostId) queryParams.append("hostId", hostId);
      if (queryParams.toString()) {
        query = `?${queryParams.toString()}`;
      }
      return callApi(`/patungan${query}`, "GET");
    },
    getDetail: ({ id }) => callApi(`/patungan/${id}`, "GET"),
    create: ({ title, category, unit, targetQuota, totalPrice, currentQuota, area, deadline, whatsapp, notes, refLink }) =>
      callApi("/patungan", "POST", { title, category, unit, targetQuota, totalPrice, currentQuota, area, deadline, whatsapp, notes, refLink }),
    update: ({ id, title, category, unit, targetQuota, totalPrice, currentQuota, area, deadline, whatsapp, notes, refLink, updateComment }) =>
      callApi(`/patungan/${id}`, "PUT", { title, category, unit, targetQuota, totalPrice, currentQuota, area, deadline, whatsapp, notes, refLink, updateComment }),
    addLog: ({ id, text }) => callApi(`/patungan/${id}/log`, "POST", { text }),
    join: ({ id, quota }) => callApi(`/patungan/${id}/join`, "POST", { quota }),
    //leave: ({ id }) => callApi(`/patungan/${id}/leave`, "POST"),
    finish: ({ id, proofLink }) => callApi(`/patungan/${id}/finish`, "POST", { proofLink }),
    //delete: ({ id }) => callApi(`/patungan/${id}`, "DELETE"),
    updateStatus: ({ id, status }) => callApi(`/patungan/${id}/status`, "PATCH", { status }),
    getParticipants: ({ id }) => callApi(`/patungan/${id}/participants`, "GET"),
    updateParticipantStatus: ({ id, participantId, status }) => callApi(`/patungan/${id}/participants/${participantId}`, "PATCH", { status }),
    deleteParticipant: ({ id, participantId }) => callApi(`/patungan/${id}/participants/${participantId}`, "DELETE"),
    addReview: ({ id, rating, comment }) => callApi(`/patungan/${id}/reviews`, "POST", { rating, comment }),
  },
  community: {
    getAll: ({ q, category } = {}) => {
      let query = "";
      const queryParams = new URLSearchParams();
      if (q) queryParams.append("q", q);
      if (category) queryParams.append("category", category);
      if (queryParams.toString()) {
        query = `?${queryParams.toString()}`;
      }
      return callApi(`/community${query}`, "GET");
    },
    getDetail: ({ id }) => callApi(`/community/${id}`, "GET"),
    create: ({ judul, kategoriKey, lokasi, ringkasan, deskripsiLengkap }) => callApi("/community", "POST", { judul, kategoriKey, lokasi, ringkasan, deskripsiLengkap }),
    update: ({ id, judul, kategoriKey, lokasi, ringkasan, deskripsiLengkap }) => callApi(`/community/${id}`, "PUT", { judul, kategoriKey, lokasi, ringkasan, deskripsiLengkap }),
    delete: ({ id }) => callApi(`/community/${id}`, "DELETE"),
    addComment: ({ id, text }) => callApi(`/community/${id}/comments`, "POST", { text }),
    toggleLike: ({ id }) => callApi(`/community/${id}/like`, "POST"),
  },
  history: {
    getAll: () => callApi("/history", "GET"),
    getSummary: () => callApi("/history/summary", "GET"),
  },
  public: {
    getStats: () => callApi("/public/stats", "GET"),
  },
  comments: {
    getForPatungan: ({ patunganId }) => callApi(`/patungan/${patunganId}/comments`, "GET"),
    postForPatungan: ({ patunganId, text }) => callApi(`/patungan/${patunganId}/comments`, "POST", { text }),
    getForCommunity: ({ communityId }) => callApi(`/community/${communityId}/comments`, "GET"),
    postForCommunity: ({ communityId, text }) => callApi(`/community/${communityId}/comments`, "POST", { text }),
  }
};
