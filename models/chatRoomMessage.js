const mongoose = require('mongoose');
const { Users } = require('./userModel');
const { Story } = require('./storyModel');
const {Rooms} = require('./chatRooms');

const messageSchema = new mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rooms',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    recipient_name:{
        type:String,
        required: true
    },
    message:{
        type:String,
        required: true
    },
    creation_date: {
        type: String
    },
    creation_time: {
        type: String
    }
})

const Messages = mongoose.model('Messages', messageSchema);
module.exports = {Messages};