const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const {paths} = require('./paths');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


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
            return callback('Room and name must be provided');
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage(`Server ${params.room}`, 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(`Server ${params.room}`, `${params.name} joined the chat`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        
        if (user && isRealString(message.text))
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
            //socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        
        var user = users.getUser(socket.id);

        if(user)
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));

    });


    socket.on('disconnect', () => {
        console.log('User disconnected');
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage(`Server ${user.room}`, `${user.name} has left the chat`));
        }
    });
});



// Routes


// Listen
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// Ideas:
// - Case insensitive room names
// - Currently active chat rooms -> Drop down