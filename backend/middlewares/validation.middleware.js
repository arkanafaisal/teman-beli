export const validate = (config) => {
  return (req, res, next) => {
    if (config.body) {
      const result = config.body.safeParse(req.body);
      if (!result.success) return res.sendStatus(400);
      req.validated = result.data;
    }

    if (config.params) {
      const result = config.params.safeParse(req.params);
      if (!result.success) return res.sendStatus(400);
      req.validatedParams = result.data;
    }

    if (config.query) {
      const result = config.query.safeParse(req.query);
      if (!result.success) return res.sendStatus(400);
      req.validatedQuery = result.data;
    }

    next();
  };
};
