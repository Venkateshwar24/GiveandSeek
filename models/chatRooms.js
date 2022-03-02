const mongoose = require('mongoose');
const { Users } = require('./userModel');
const { Story } = require('./storyModel');

const chatRoomSchema = new mongoose.Schema({
    story_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story',
        required: true
    },
    recipient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    creation_date: {
        type: String
    },
    creation_time: {
        type: String
    }
})

const Rooms = mongoose.model('Rooms', chatRoomSchema);
module.exports = { Rooms};