const express = require('express');
const router = express.Router();
const {Messages} = require('../models/chatRoomMessage');

router.get('/:id',(req,res) =>{
    const chatRoom = req.params.id;
    Messages.find({room_id:chatRoom},(err,doc) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(doc);
        }
    })
})

module.exports = router;