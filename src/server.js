"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const socket_io_1 = require("socket.io");
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
const connectedUsers = [];
io.on("connection", (socket) => {
    connectedUsers.push(socket.id);
    console.log("connected users: ", connectedUsers, " : ", connectedUsers.length);
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
