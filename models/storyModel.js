const mongoose = require('mongoose');
const {Users} = require('./userModel');



var storySchema = new mongoose.Schema({
    story_title : {type:String,required:true},
    recipient_name : {type:String,required:true},
    story_description : {type: String, required:true},
    creation_date : {type:String, required:true},
    creation_time : {type:String, required:true},
    isfundRequired : {type:Boolean,required:true},
    user_id :  {type:mongoose.Schema.Types.ObjectId, ref : 'Users'},
    user_name : {type:String},
    documents_proof : [{type:String,required:true}],
    bank_name:{type:String},
    holder_name : {type : String},
    account_number : {type :String},
    ifsc_code : {type:String},
    upi_id : {type:String},
    updates : [{
        update_title :{type:String},
        update_description :{type:String},
        update_creation_date : {type:String}   
    }]
});



const Story = mongoose.model('Story',storySchema);
module.exports = {Story};