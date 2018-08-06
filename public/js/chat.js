var socket = io();

// autoscroll function
function scrollToBottom() {
    // Selectors
    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child");

    // Heights
    // prop fetches a particular property
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    // gets the previous message's height
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        // console.log("Should scroll!");
        messages.scrollTop(scrollHeight);
    }
}

// the first argument is the name of the event: connect
socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);

    socket.emit("join", params, function (err) {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log("No error");
        }

    });
});

socket.on('disconnect', function () {
    console.log("Disconnected from server");
});

socket.on("updateUserList", function (users) {
    // console.log("Users list", users);
    var ol = jQuery("<ol></ol>");

    users.forEach(function (user) {
        ol.append(jQuery("<li></li>").text(user));
    });

    jQuery("#users").html(ol);
});

// listen to the newMessage event from the server
socket.on("newMessage", function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();
});

// add an event listener for the new location message event
socket.on("newLocationMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery("#location-message-template").html();

    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    jQuery("#messages").append(html);
    scrollToBottom();
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