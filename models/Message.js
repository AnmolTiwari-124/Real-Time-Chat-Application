// models/Message.js
const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // If private messages
    room: { type: String }, // If public rooms
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Message', messageSchema);