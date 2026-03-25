const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("Подключился:", socket.id);

    socket.on("join", (username) => {
        socket.username = username;
        io.emit("chat message", `${username} зашел в чат`);
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", `${socket.username}: ${msg}`);
    });

    socket.on("disconnect", () => {
        if (socket.username) {
            io.emit("chat message", `${socket.username} вышел`);
        }
    });
});

server.listen(3000, () => {
    console.log("Сервер: http://localhost:3000");
});