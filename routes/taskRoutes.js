const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createTask,
  updateTask,
  deleteTask,
  assignTaskToUser,
} = require("../services/taskService");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware, async (req, res) => {
  const data = await createTask(req.body);
  if (data == 1)
    return res.status(500).json({ message: "Something went wrong" });
  else if (data == 2)
    return res
      .status(409)
      .json({ message: "Task with same title already exists" });
  else res.json(data);
});

router.patch("/:id", authMiddleware, roleMiddleware, async (req, res) => {
  const data = await updateTask(req.params.id, req.body);
  if (data == 1)
    return res.status(500).json({ message: "Something went wrong" });
  else if (data == 2)
    return res
      .status(409)
      .json({ message: "Task with same title already exists" });
  else if (data == 3)
    return res.status(400).json({ message: "Task does not exist" });
  else res.json(data);
});

router.delete("/:id", authMiddleware, roleMiddleware, async (req, res) => {
  const data = await deleteTask(req.params.id);
  if (data == 1)
    return res.status(500).json({ message: "Something went wrong" });
  else if (data == 3)
    return res.status(400).json({ message: "Task does not exist" });
  else res.json(data);
});

router.post("/assign", authMiddleware, roleMiddleware, async (req, res) => {
  const data = await assignTaskToUser(
    req.body.taskId,
    req.body.userId,
    req.app.get("io")
  );
  if (data == 1)
    return res.status(500).json({ message: "Something went wrong" });
  else if (data == 2)
    return res.status(400).json({ message: "User does not exist" });
  else if (data == 3)
    return res.status(400).json({ message: "Task does not exist" });
  else if (data == 4)
    return res
      .status(409)
      .json({ message: "Task is already assigned to this user" });
  else res.json(data);
});

module.exports = router;
