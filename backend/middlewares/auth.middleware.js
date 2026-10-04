import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const { access_token } = req.cookies;

  if (!access_token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, name }
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
