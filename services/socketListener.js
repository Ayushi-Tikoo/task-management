const ioClient = require("socket.io-client");

const socket = ioClient(`http://localhost:${process.env.APP_PORT}`);

console.log(`http://localhost:${process.env.PORT}`);
const listenForTask = (userId) => {
  console.log("userId", userId, `task_assigned_${userId}`);
  socket.on(`task_assigned_${userId}`, (...data) => {
    console.log("New task assigned to user " + userId + " task: " + data);
  });
};

module.exports = { listenForTask };
