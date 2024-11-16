// // server.js
// const express = require('express');
// const socketIo = require('socket.io');
// const http = require('http');
// const mongoose = require('mongoose');
// const chatController = require('./controllers/chatController');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Connect to MongoDB (if using MongoDB)
// mongoose.connect('mongodb://localhost/chatapp', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));



//     app.use(express.static('public'));

// app.set('view engine', 'ejs');
// app.get('/', (req, res) => {
//     res.render('chat'); // Render the chat view
// });

// // Socket.IO events
// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     socket.on('join', (username) => {
//         chatController.joinRoom(socket, username);
//     });

//     socket.on('chatMessage', (messageText) => {
//         chatController.handleMessage(socket, messageText);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//         // Handle cleanup, e.g., remove user from chat
//     });
// });

// server.listen(3000, () => {
//     console.log('Server running on port 3000');
// });


const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');

// Serve the chat page
app.get('/', (req, res) => {
    res.render('chat'); // Render the chat EJS template
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join', (username) => {
        socket.username = username;
        console.log(`${username} joined the chat`);
    });

    socket.on('chatMessage', (messageText) => {
        const message = {
            username: socket.username,
            text: messageText,
        };
        io.emit('chatMessage', message);  // Emit the message to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
