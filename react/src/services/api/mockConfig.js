export const MOCK_ENDPOINTS = {
  "/auth/login": {
    POST: [200, 401, 403],
    mockPayload: { user: { id: 1, name: "Mahasiswa", email: "mhs@student.uns.ac.id" } }
  },
  "/auth/logout": {
    POST: [200]
  },
  "/auth/refresh": {
    POST: [200, 401]
  },
  "/users/profile": {
    GET: [200, 401],
    mockPayload: { id: 1, name: "Mahasiswa", email: "mhs@student.uns.ac.id", verified: true }
  },
  "/users/reviews": {
    GET: [200]
  },
  "/users/activity": {
    GET: [200]
  },
  "/patungan": {
    GET: [200],
    POST: [201, 400, 401, 409],
    mockPayload: { id: 99, status: "created" }
  },
  "/patungan/:id": {
    GET: [200, 404],
    DELETE: [200, 403, 404]
  },
  "/patungan/:id/join": {
    POST: [200, 401, 403, 404]
  },
  "/patungan/:id/leave": {
    POST: [200, 400, 403, 404]
  },
  "/patungan/:id/status": {
    PATCH: [200, 400, 403, 404]
  },
  "/patungan/:id/comments": {
    GET: [200],
    POST: [201, 400, 401]
  },
  "/community": {
    GET: [200],
    POST: [201, 400, 401, 409],
    mockPayload: { id: 88, status: "created" }
  },
  "/community/:id": {
    GET: [200, 404],
    DELETE: [200, 403, 404]
  },
  "/community/:id/join": {
    POST: [200, 401, 403, 404]
  },
  "/community/:id/leave": {
    POST: [200, 400, 403, 404]
  },
  "/community/:id/comments": {
    GET: [200],
    POST: [201, 400, 401]
  },
  "/history": {
    GET: [200, 401]
  },
  "/history/summary": {
    GET: [200, 401]
  },
  "/public/stats": {
    GET: [200]
  },
  "default": {
    GET: [200, 404, 500],
    POST: [200, 400, 500],
    mockPayload: { data: "success" }
  }
};
