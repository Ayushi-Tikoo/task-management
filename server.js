require("dotenv").config();
const express = require("express");
const http = require("http");
const connectDB = require("./config/db");
const socketIo = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { listenForTask } = require("./services/socketListener");

// express setup
const app = express();

// socket setup
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.set("io", io);

app.use(express.json());

// connect to db
connectDB();

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

// listening for tasks for the 2 users which I have registered
listenForTask("67bac82cee370e8388a16155");
listenForTask("67bad1277aa63d2574857be1");

server.listen(process.env.APP_PORT, () =>
  console.log(`server listening on port ${process.env.APP_PORT}`)
);
