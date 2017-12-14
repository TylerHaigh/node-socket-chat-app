const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const {paths} = require('./paths');
const {isRealString} = require('./utils/validation');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


// Middleware

app.use('/jquery', express.static(paths.jqueryFolder)); // https://stackoverflow.com/a/29537014/2442468
app.use('/moment', express.static(paths.momentFolder));
app.use('/mustache', express.static(paths.mustacheFolder));
app.use('/deparam', express.static(paths.deparamFolder));
app.use(express.static(paths.publicPath));



io.on('connection', (socket) => {
    console.log('New user connected');

    

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room))
            callback('Room and name must be provided');
        
        socket.join(params.room);

        socket.emit('newMessage', generateMessage('Server', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(`Server ${params.room}`, `${params.name} joined`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        //socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));

        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Server', coords.latitude, coords.longitude));
    });


    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



// Routes


// Listen
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});