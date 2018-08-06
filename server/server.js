// a built-in module to make access to different directories easier
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
var app = express();
// using the http server as opposed to the express server
var server = http.createServer(app);
// create our web socket server
var io = socketIO(server);
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
var users = new Users();
const publicPath = path.join(__dirname, '../public');
// set up port for heroku
const port = process.env.PORT || 3000;

// use the static html document
app.use(express.static(publicPath));

// register an event listener.
// listen for a new connection
io.on('connection', (socket) => {
    console.log("New user connected");

    // listen to the join event
    socket.on("join", (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and room name are required");
        }
        // limit chat messages to just the people who are in the room
        // the user joins the room
        socket.join(params.room);
        // remove the user from potential previous rooms
        users.removeUser(socket.id);
        // add the user to the new room
        users.addUser(socket.id, params.name, params.room);

        // emit the updateUserList event to the specific room
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // socket.emit from admin to the user who joined
        // responsible for greeting the specific individual user
        socket.emit("newMessage", generateMessage("Admin", `Welcome to the chat app, ${params.name}!`));

        // socket.broadcast.emit from admin to everybody but the user who joined
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined!`));
        callback();
    });

    // listen to the createMessage event FROM the client
    socket.on('createMessage', (message, callback) => {
        console.log("createMessage", message);

        // emit that event to EVERY connection (including the same client) using io.emit
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    // listen to the createLocationMessage event
    socket.on('createLocationMessage', (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        // console.log("Client disconnected");
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage("Admin",`${user.name} has left.`));
        }
    });
});

// use server.listen instead of app.listen
server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

