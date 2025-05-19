import http from "http";
import app from "./app";
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types/socket";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, { cors: { origin: "*" } });

const connectedUsers: string[] = [];

io.on("connection", (socket) => {
  connectedUsers.push(socket.id);
  console.log(
    "connected users: ",
    connectedUsers,
    " : ",
    connectedUsers.length
  );

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("pointerMove", (pointer) => {
    io.emit("pointersMove", pointer);
  });

  socket.on("disconnect", (reason) => {
    console.log("user disconnected: ", reason);
    // io.emit("message", `"user disconnected": ${socket.id}`);
    io.emit("pointersMove", {
      id: socket.id,
      x: 0,
      y: 0,
    });
    console.log(connectedUsers.splice(connectedUsers.indexOf(socket.id)));
  });
});

// io.listen(3000);

server.listen(PORT, () => {
  console.log(`Server is listning on http://localhost:${PORT}`);
});
