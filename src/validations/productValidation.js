const productValidation = (req, res, next) => {
  const { name } = req.body;
  const MIN_LENGTH = 5;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < MIN_LENGTH) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

module.exports = {
  productValidation,
};