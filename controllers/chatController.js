
const Message = require('../models/Message');  // Assuming you have a Message model

// Handle joining a room (you can implement room functionality here)
exports.joinRoom = (socket, username) => {
    socket.username = username;
    console.log(`${username} joined the chat`);
};

// Handle incoming chat messages
exports.handleMessage = (socket, messageText) => {
    const message = new Message({
        username: socket.username,
        text: messageText,
        timestamp: new Date()
    });

    message.save()
        .then((savedMessage) => {
            // Broadcast the new message to all clients
            io.emit('chatMessage', {
                username: savedMessage.username,
                text: savedMessage.text
            });
        })
        .catch(err => console.error(err));
};
