export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.sendStatus(400);
    }
    req.validated = result.data;
    next();
  };
};
