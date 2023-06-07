const middleware = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error } = schema.validate(req.body, options);

  if (error) {
    const { details } = error;
    
    const message = details.map((i) => i.message).join(',');

    res.status(422).json({ message, error });
  } else {
    next();
  }
};

export default middleware;
