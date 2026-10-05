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
    login: (payload) => callApi("/auth/login", "POST", payload),
    loginManual: (payload) => callApi("/auth/login-manual", "POST", payload),
    logout: () => callApi("/auth/logout", "POST"),
    refresh: () => callApi("/auth/refresh", "POST"),
  },
  user: {
    getProfile: () => callApi("/users/profile", "GET"),
    updateProfile: (payload) => callApi("/users/profile", "PUT", payload),
    setPassword: (payload) => callApi("/users/password", "PUT", payload),
    getReviews: () => callApi("/users/reviews", "GET"),
    getActivity: () => callApi("/users/activity", "GET"),
  },
  patungan: {
    // Parameter query string bisa dilempar sebagai params nantinya
    getAll: (params) => {
      let query = "";
      if (params) {
        const queryParams = new URLSearchParams();
        if (params.q) queryParams.append("q", params.q);
        if (params.category) queryParams.append("category", params.category);
        if (params.hostId) queryParams.append("hostId", params.hostId);
        if (queryParams.toString()) {
          query = `?${queryParams.toString()}`;
        }
      }
      return callApi(`/patungan${query}`, "GET");
    }, 
    getDetail: (id) => callApi(`/patungan/${id}`, "GET"),
    create: (payload) => callApi("/patungan", "POST", payload),
    update: (id, payload) => callApi(`/patungan/${id}`, "PUT", payload),
    addLog: (id, payload) => callApi(`/patungan/${id}/log`, "POST", payload),
    join: (id, payload) => callApi(`/patungan/${id}/join`, "POST", payload),
    leave: (id) => callApi(`/patungan/${id}/leave`, "POST"),
    finish: (id, payload) => callApi(`/patungan/${id}/finish`, "POST", payload),
    delete: (id) => callApi(`/patungan/${id}`, "DELETE"),
    updateStatus: (id, payload) => callApi(`/patungan/${id}/status`, "PATCH", payload),
    getParticipants: (id) => callApi(`/patungan/${id}/participants`, "GET"),
    updateParticipantStatus: (id, participantId, status) => callApi(`/patungan/${id}/participants/${participantId}`, "PATCH", { status }),
    deleteParticipant: (id, participantId) => callApi(`/patungan/${id}/participants/${participantId}`, "DELETE"),
    addReview: (id, payload) => callApi(`/patungan/${id}/reviews`, "POST", payload),
  },
  community: {
    getAll: (params) => {
      let query = "";
      if (params) {
        const queryParams = new URLSearchParams();
        if (params.q) queryParams.append("q", params.q);
        if (params.category) queryParams.append("category", params.category);
        if (queryParams.toString()) {
          query = `?${queryParams.toString()}`;
        }
      }
      return callApi(`/community${query}`, "GET");
    },
    getDetail: (id) => callApi(`/community/${id}`, "GET"),
    create: (payload) => callApi("/community", "POST", payload),
    addComment: (id, payload) => callApi(`/community/${id}/comments`, "POST", payload),
    join: (id) => callApi(`/community/${id}/join`, "POST"),
    leave: (id) => callApi(`/community/${id}/leave`, "POST"),
    delete: (id) => callApi(`/community/${id}`, "DELETE"),
  },
  history: {
    getAll: (params) => callApi("/history", "GET"),
    getSummary: () => callApi("/history/summary", "GET"),
  },
  public: {
    getStats: () => callApi("/public/stats", "GET"),
  },
  comments: {
    getForPatungan: (patunganId) => callApi(`/patungan/${patunganId}/comments`, "GET"),
    postForPatungan: (patunganId, payload) => callApi(`/patungan/${patunganId}/comments`, "POST", payload),
    getForCommunity: (communityId) => callApi(`/community/${communityId}/comments`, "GET"),
    postForCommunity: (communityId, payload) => callApi(`/community/${communityId}/comments`, "POST", payload),
  }
};
