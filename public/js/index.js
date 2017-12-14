var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// socket.emit('createMessage', {
//    from: 'Jordan' ,
//    text: 'Hi'
// }, function (data)  {
//     console.log('Got it', data);
// });

socket.on('newMessage', function (message) {
    // console.log(message);

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    // console.log(message);

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>')

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);
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