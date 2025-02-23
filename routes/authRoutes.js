const express = require("express");
const { registerUser, loginUser } = require("../services/authService");

const router = express.Router();

router.post("/register", async (req, res) => {
  const user = await registerUser(req.body.username, req.body.password);
  if (user == 1) res.status(500).json({ message: "Something went wrong" });
  else res.json(user);
});

router.post("/login", async (req, res) => {
  const user = await loginUser(req.body.username, req.body.password);
  if (user == 1)
    res.status(401).json({ message: "Invalid username or password" });
  else if (user == 2) res.status(500).json({ message: "Something went wrong" });
  else res.json(user);
});

module.exports = router;
