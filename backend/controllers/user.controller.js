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

UserController.deleteProfile = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.validated;

  const user = await UserModel.getUserById(userId);
  if (!user || user.name !== name) {
    return res.sendStatus(403);
  }
  
  await UserModel.deleteProfile(userId);
  
  // Clear the auth tokens
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  
  res.sendStatus(200);
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
