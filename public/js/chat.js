var socket = io();

function scrollToBotton() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }

}



socket.on('connect', function () {

    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('Connected to server');
        }
    });

});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});



socket.on('updateUserList', function(users) {
    console.log('User List: ', users);

    var ul = jQuery('<ol></ol>');
    users.forEach( function(username) {
        ul.append(jQuery('<li></li>').text(username));
    });

    jQuery('#users').html(ul);

});

// socket.emit('createMessage', {
//    from: 'Jordan' ,
//    text: 'Hi'
// }, function (data)  {
//     console.log('Got it', data);
// });

socket.on('newMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBotton();
});

socket.on('newLocationMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBotton();
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var textbox = jQuery('[name=message');

    socket.emit('createMessage', {
        from: 'User',
        text: textbox.val()
    }, function() {
        textbox.val('');
    });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
    if (!navigator.geolocation)
        return alert('Geolocation not supported');

        locationButton.attr('disabled', 'disabled').text('Sending location...');

        navigator.geolocation.getCurrentPosition( function(position) {
            
            locationButton.removeAttr('disabled').text('Send Location');
            
            // console.log(position);

            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function() {
            locationButton.removeAttr('disabled').text('Send Location');
            alert('unable to fetch location');
        });
    
});