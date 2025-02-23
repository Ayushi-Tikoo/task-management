const { mongoose } = require("mongoose");
const Task = require("../models/Task");
const TaskUser = require("../models/TaskUser");
const User = require("../models/User");

const checkTaskIdExists = async (taskId) => {
  try {
    const objectId = new mongoose.Types.ObjectId(taskId);
    const task = await Task.findById(objectId);
    return task ? task : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkUserIdExists = async (userId) => {
  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    const user = await User.findById(objectId);
    return user ? user : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createTask = async (taskData) => {
  try {
    const sameTitleExists = await Task.findOne({ title: taskData.title });
    if (sameTitleExists) return 2; // task with same title already exists
    return await Task.create(taskData);
  } catch (error) {
    console.log("Error in creating task", error);
    return 1;
  }
};

const updateTask = async (taskId, updateData) => {
  try {
    const taskData = await checkTaskIdExists(taskId);
    if (!taskData) return 3; // invalid task id
    else if (updateData.title) {
      const sameTitleExists = await Task.findOne({ title: updateData.title });
      if (sameTitleExists) return 2; // task with same title already exists
    }
    return await Task.findByIdAndUpdate(taskId, updateData, { new: true });
  } catch (error) {
    console.log("Error in updating task", error);
    return 1;
  }
};

const deleteTask = async (taskId) => {
  try {
    const taskData = await checkTaskIdExists(taskId);
    if (!taskData) return 3; // invalid task id
    return await Task.findByIdAndDelete(taskId);
  } catch (error) {
    console.log("Error in delete task", error);
    return 1;
  }
};

const assignTaskToUser = async (taskId, userId, io) => {
  try {
    const task = await checkTaskIdExists(taskId);
    const user = await checkUserIdExists(userId);
    if (!task) return 3; // invalid task id
    if (!user) return 2; // invalid user id
    const isTaskAlreadyAssigned = await TaskUser.findOne({ taskId, userId });
    if (isTaskAlreadyAssigned) return 4; // task is already assigned to this user
    const taskUser = await TaskUser.create({ taskId, userId });

    // Notify the user that the task has been to him
    console.log(`task_assigned_${userId}`);

    io.emit(`task_assigned_${userId}`, `${task.title}`);

    return taskUser;
  } catch (error) {
    console.log("Error in assign task", error);
    return 1;
  }
};

module.exports = { createTask, updateTask, deleteTask, assignTaskToUser };
