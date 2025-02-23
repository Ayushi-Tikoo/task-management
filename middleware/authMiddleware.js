const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const val = jwt.verify(token, process.env.JWT_SECRET);
    req.user = val;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
