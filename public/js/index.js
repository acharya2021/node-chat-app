var socket = io();
// the first argument is the name of the event: connect
socket.on('connect', function () {
    console.log("Connected to server");
});

socket.on('disconnect', function () {
    console.log("Disconnected from server");
});

// listen to the newMessage event from the server
socket.on("newMessage", function (message) {
    console.log("newMessage", message);
});

