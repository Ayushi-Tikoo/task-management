const jwt = require("jsonwebtoken");

const roleMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });
    else next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = roleMiddleware;
