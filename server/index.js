require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const PORT = process.env.PORT;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.get("/",(req,res)=>{
    res.send("HELL ITS WORKING");
});

io.on("connection", (socket) => {
    console.log("User connected : ", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("User with ID: ", socket.id, "joined the room", data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(PORT , () => {
    console.log("Listening");
});
