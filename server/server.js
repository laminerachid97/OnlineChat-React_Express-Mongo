const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const apis = require('./api');
const connectDB = require('./cnx');
const socket = require('./socket');

require('dotenv').config();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

connectDB();
const users = {};

app.use('/', apis);

const server = http.createServer(app);
const io = socket.init(server);

io.on('connection', (socket) => {
    console.log("User connected::", socket.id);

    socket.on("registerUser", ({ userId, username }) => {
        // users[userId] = socket.id;
        const user = {
            id: userId,
            idsocket: socket.id,
            name: username
        }
        users[userId] = user;
        console.log("User registered:", userId, "Socket ID:", socket.id);
        // console.log("Emitting onlineUsers:", users);
        setTimeout(() => {
            io.emit("onlineUsers", users);
        }, 2000)
    });

    socket.on("getUsers", (callback) => {
        callback(users);
    })

    socket.on("sendMessage", (message) => {
        socket.broadcast.emit("receiveMessage", message);
        console.log(message);
    })

    socket.on("disconnect", () => {
        console.log("User disconnected::", socket.id);
        // remove user from map
        for (const userId in users) {
            if (users[userId].idsocket === socket.id) {
                delete users[userId];
                break;
            }
        }
        // console.log("list connected rest: ", users);
        io.emit("onlineUsers", users);
    });
})

server.listen(process.env.PORT, () => {
    console.log(`Socket.IO + Express server running on port: ${process.env.PORT}`);
})