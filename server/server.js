const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage} = require('./utils/message');
const {paths} = require('./paths');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


// Middleware

app.use('/jquery', express.static(paths.jqueryFolder)); // https://stackoverflow.com/a/29537014/2442468
app.use(express.static(paths.publicPath));



io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Server', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Server', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        //socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));

        callback('This is from the server');
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