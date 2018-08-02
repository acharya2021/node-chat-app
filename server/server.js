// a built-in module to make access to different directories easier
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var app = express();
// using the http server as opposed to the express server
var server = http.createServer(app);
// create our web socket server
var io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
// set up port for heroku
const port = process.env.PORT || 3000;

// use the static html document
app.use(express.static(publicPath));

// register an event listener.
// listen for a new connection
io.on('connection', (socket) => {
    console.log("New user connected");

    // emit a newMessage event TO the client
    socket.emit("newMessage", {
        from: "apple@yahoo.com",
        text: "Hey this is Apple!",
        createdAt: 123
    });

    // listen to the createMessage event FROM the client
    socket.on('createMessage', (newMessage) => {
        console.log("createMessage", newMessage);
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});


// use server.listen instead of app.listen
server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

