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

    // create an object using jQuery
    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    // select the object using jQuery
    jQuery("#messages").append(li);

});

// add an event listener to the selected form
jQuery("#message-form").on('submit', function (e) {
    // overriding to prevent the page from reloading by default
    e.preventDefault();

    socket.emit('createMessage', {
        from: "User",
        text: jQuery("[name=message]").val()
    }, function () {

    });


});