const mongoose = require('mongoose');

//const bcrypt = require('bcryptjs');


var userSchema = new mongoose.Schema({
    user_name : {type:String, required:true},
    email_id : {type: String, required:true},
    user_password : {type:String, required:true},
    mob_no : {type:String, required:true},
    
    //saltSecret: String 
});

// userSchema.pre('save', function (next){
//     bcrypt.genSalt(10,(err,salt) =>{
//         bcrypt.hash(this.user_password, salt, (err,hash) => {
//             this.user_password = hash;
//             this.saltSecret = salt;
//             next();
//         });
//     });

// });

const Users = mongoose.model('Users',userSchema);
module.exports = {Users};