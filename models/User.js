// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    socketId: { type: String, required: true },
    // Add any other relevant fields
});

module.exports = mongoose.model('User', userSchema);

