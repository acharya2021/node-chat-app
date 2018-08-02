var socket = io();
// the first argument is the name of the event: connect
socket.on('connect', function () {
    console.log("Connected to server");

    // emit the event to the server after you're connected
    socket.emit('createMessage', {
        to: "whomitmayconern@gmail.com",
        text: "This is from the client to the server"
    });
});

socket.on('disconnect', function () {
    console.log("Disconnected from server");
});

// listen to the newMessage event from the server
socket.on("newMessage", function (message) {
    console.log("newMessage", message);
});

