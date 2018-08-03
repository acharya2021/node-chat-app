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

// add an event listener for the new location message event
socket.on("newLocationMessage", function (message) {
    var li = jQuery("<li></li>");

    // target = '_blank' opens the map in a NEW tab
    var a = jQuery("<a target='_blank'>My current location</a>");

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
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

var locationButton = jQuery("#send-location");

locationButton.on("click", function () {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser");
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert("Unable to fetch location");
    });
});