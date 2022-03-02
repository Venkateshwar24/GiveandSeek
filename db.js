const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Venkateshwar:4MWczkBLdOH29cTu@cluster0.bxl9m.mongodb.net/GiveAndSeek?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(!err)
    {
        console.log('Database Connected!');
    }
    
    else
    {
        console.log(` Error in connecting the database ${err}`); 
    }
    
});

module.exports = mongoose;