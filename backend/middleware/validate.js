export const validateItem = (req, res, next) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      message: "Name, price, and category are required",
    });
  }

  if (isNaN(price)) {
    return res.status(400).json({
      message: "Price must be a number",
    });
  }

  next();
};