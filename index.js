const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("A new user has connected", socket.id);

    // Log when a message is received from a client
    socket.on("user-message", (message) => {
        console.log("Received message from client:", message);
        // Emit the message to all connected clients
        io.emit("message", message);
    });
});

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});

server.listen(9000, () => console.log(`Server started on PORT: 9000`));
