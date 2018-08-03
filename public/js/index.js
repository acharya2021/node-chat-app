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

    var formattedTime = moment(message.createdAt).format('h:mm a');
    // create an object using jQuery
    var li = jQuery("<li></li>");
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // select the object using jQuery
    jQuery("#messages").append(li);

});

// add an event listener for the new location message event
socket.on("newLocationMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");

    var li = jQuery("<li></li>");

    // target = '_blank' opens the map in a NEW tab
    var a = jQuery("<a target='_blank'>My current location</a>");

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery("#messages").append(li);
});

// add an event listener to the selected form
jQuery("#message-form").on('submit', function (e) {
    // overriding to prevent the page from reloading by default
    e.preventDefault();

    var messageTextbox = jQuery("[name=message]");

    socket.emit('createMessage', {
        from: "User",
        text: messageTextbox.val()
    }, function () {
        // remove the text in the message box by assigning an empty string
        messageTextbox.val("")
    });
});

var locationButton = jQuery("#send-location");

locationButton.on("click", function () {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser");
    }

    // disable the send location button upon click
    locationButton.attr('disabled', 'disabled').text("Sending location...");

    navigator.geolocation.getCurrentPosition(function (position) {
        // enable the send location button
        locationButton.removeAttr('disabled').text("Send location");
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        // enable the send location button
        locationButton.removeAttr('disabled').text("Send location");
        alert("Unable to fetch location");
    });
});