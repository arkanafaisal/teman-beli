import { UserModel } from '../models/user.model.js';
import { setPasswordSchema } from '../schemas/auth.schema.js';

export const UserController = {};

UserController.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.getUserById(userId);

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

UserController.setPassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const validatedData = setPasswordSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.sendStatus(400);
    }

    const { password } = validatedData.data;

    await UserModel.updatePassword(userId, password);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

UserController.getReviews = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const limit = 30;

    const reviews = await UserModel.getReviewsByHost(userId, limit);

    res.status(200).json({ success: true, payload: reviews });
  } catch (error) {
    next(error);
  }
};
