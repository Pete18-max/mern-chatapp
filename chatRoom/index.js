const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static("public"));

let userCount = 0;

io.on("connection", (socket) => {
  userCount += 1;
  const username = `User ${userCount}`;
  socket.username = username;

  socket.emit("message", { username: "System", text: `Welcome ${username}!` });

  socket.broadcast.emit("message", {
    username: "System",
    text: `${username} has joined the chat!`,
  });

  socket.on("chatMessage", (message) => {
    io.emit("message", { username: socket.username, text: message });
  });

  socket.on("disconnect", () => {
    io.emit("message", {
      username: "System",
      text: `${socket.username} has left the chat.`,
    });
  });
});

const PORT = process.env.PORT || 3002;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

server.listen(PORT, "10.40.0.24", () => {
  console.log(`Server running on http://10.40.0.24:${PORT}`);
});
