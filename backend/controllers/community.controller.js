import { createCommunitySchema, createCommunityCommentSchema } from '../schemas/community.schema.js';
import { createCommunityModel, getAllCommunitiesModel, getCommunityByIdModel, createCommunityCommentModel, toggleCommunityLikeModel } from '../models/community.model.js';

export const createCommunity = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.sendStatus(401);
    }

    const parseResult = createCommunitySchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.sendStatus(400);
    }

    const { judul, kategoriKey, lokasi, ringkasan, deskripsiLengkap } = parseResult.data;

    await createCommunityModel({
      title: judul,
      category: kategoriKey,
      location: lokasi,
      summary: ringkasan,
      description: deskripsiLengkap,
      authorId: user.id
    });

    return res.sendStatus(201);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.sendStatus(409);
    }
    throw error;
  }
};

export const getAllCommunities = async (req, res) => {
  const { category, q } = req.query;
  const userId = req.user?.id;
  const communities = await getAllCommunitiesModel(category, q, userId);
  
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
    comments: c.comments ? c.comments.map(comment => ({
      author: comment.author.name,
      text: comment.text,
      date: comment.createdAt
    })) : []
  }));

  return res.status(200).json(formatted);
};

export const getCommunityDetail = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  
  const c = await getCommunityByIdModel(id, userId);
  
  if (!c) {
    return res.sendStatus(404);
  }
  
  const formatted = {
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
    comments: c.comments ? c.comments.map(comment => ({
      author: comment.author.name,
      text: comment.text,
      date: comment.createdAt
    })) : []
  };

  return res.status(200).json({ payload: formatted });
};

export const addComment = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.sendStatus(401);

    const parseResult = createCommunityCommentSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.sendStatus(400);
    }

    const { id } = req.params;
    await createCommunityCommentModel({
      text: parseResult.data.text,
      authorId: user.id,
      communityId: id
    });

    return res.sendStatus(201);
  } catch (error) {
    if (error.code === 'P2003') { // Foreign key constraint failed (e.g. community not found)
      return res.sendStatus(404);
    }
    throw error;
  }
};

export const toggleLike = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.sendStatus(401);

    const { id } = req.params;
    const result = await toggleCommunityLikeModel(id, user.id);

    return res.status(200).json({ payload: result });
  } catch (error) {
    if (error.code === 'P2003') {
      return res.sendStatus(404);
    }
    throw error;
  }
};
