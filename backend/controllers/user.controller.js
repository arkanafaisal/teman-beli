import { UserModel } from '../models/user.model.js';
// Removed schema import

export const UserController = {};

UserController.getProfile = async (req, res) => {
  const userId = req.user.id;
  const user = await UserModel.getUserById(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

UserController.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { department, password } = req.validated;

  const updateData = {};
  if (department !== undefined && department !== null) {
    updateData.department = department;
  }
  if (password) {
    updateData.password = password;
  }

  if (Object.keys(updateData).length === 0) {
    return res.sendStatus(400);
  }

  const updatedUser = await UserModel.updateProfile(userId, updateData);
  
  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(200);
};

UserController.getReviews = async (req, res) => {
  const userId = req.user.id;
  const limit = 30;

  const reviews = await UserModel.getReviewsByHost(userId, limit);

  res.status(200).json({ success: true, payload: reviews });
};

UserController.getUserCommunities = async (req, res) => {
  const userId = req.user.id;
  const { getUserCommunitiesModel } = await import('../models/community.model.js');
  const communities = await getUserCommunitiesModel(userId);
  
  const formatted = communities.map(c => ({
    id: c.id,
    judul: c.title,
    kategoriKey: c.category,
    lokasi: c.location,
    ringkasan: c.summary,
    deskripsiLengkap: c.description,
    author: c.author.name,
    authorInfo: c.author.department || "Mahasiswa",
    authorRating: c.author.rating,
    authorReviewCount: c.author.reviewCount,
    likes: c._count?.likes || 0,
    isLiked: c.likes && c.likes.length > 0,
    comments: [] // Generally not needed for the list preview
  }));

  res.status(200).json({ payload: formatted });
};

UserController.getAllUsers = async (req, res) => {
  if (req.user.role !== 'ADMIN') return res.sendStatus(403);
  const { q, status } = req.validatedQuery;
  const users = await UserModel.getAllUsers({ search: q, status });
  res.status(200).json({ payload: users });
};

UserController.deleteUser = async (req, res) => {
  const { id } = req.validatedParams;
  const { action } = req.query;
  const { name } = req.validated;
  const isSelf = req.user.id === id;
  const isAdmin = req.user.role === 'ADMIN';

  if (!isSelf && !isAdmin) {
    return res.sendStatus(403);
  }

  const target = await UserModel.getUserById(id);
  if (!target) return res.sendStatus(404);
  
  if (isAdmin) {
    // Protect admin from being deleted by another admin
    if (target.role === 'ADMIN') return res.sendStatus(403);
  } else {
    // Normal user deleting their own account must provide the correct name
    if (target.name !== name) {
      return res.sendStatus(403);
    }
  }

  const isDeleted = action !== 'restore';
  await UserModel.setUserStatus(id, isDeleted);

  // If a user deletes their own account, clear their cookies
  if (isSelf && isDeleted) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }

  res.sendStatus(200);
};
