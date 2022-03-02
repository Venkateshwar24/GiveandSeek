const mongoose = require('mongoose');
const {Users} = require('./userModel');
const {Story} = require('./storyModel');

const commentsSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required:true
    },
    user_name :{
        type : String,
        required:true

    },
    story_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Story',
        required:true
    },
    user_comment : {
        type : String,
        required:true  
    },
    creation_date : {
        type:String},
    creation_time : {
        type:String}
})

const Comments = mongoose.model('Comments',commentsSchema);
module.exports = {Comments};