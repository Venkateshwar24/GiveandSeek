const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var story_id = require('mongoose').Types.ObjectId;
var { Users } = require('./../models/userModel');
var { Story } = require('./../models/storyModel');
var { Rooms } = require('./../models/chatRooms');
const moment = require('moment');
const currDate = moment().format('DD MMM` YY');
const currTime = moment().format('hh:mm');

// router.get('/:id', (req, res) => {
//     if (!story_id.isValid(req.params.id)) {
//         return res.status(400).send('No records found at:', `${req.params.id}`);
//     }


//     Comments.find({ story_id: req.params.id }, (err, doc) => {

//         if (!err) {
//             res.send(doc);
//         }
//         else {
//             console.log(err);
//         }



//     });
// });


router.get('/',(req,res) => {
    Rooms.find((err,docs)=>{
        if(!err)
         res.send(docs);
        else
         console.log(err);
    })
});
// router.get('/', (req, res) => {
//     if (!story_id.isValid(req.params.id)) {
//         return res.status(400).send('No records found at:', `${req.params.id}`);
//     }


//     Comments.find({ story_id: req.params.id }, (err, doc) => {

//         if (!err) {
//             res.send(doc);
//         }
//         else {
//             console.log(err);
//         }



//     });
// });


router.post('/', (req, res) => {

    Rooms.findOne({story_id : req.body.story_id},(err,docs) =>{
        if(docs)
         {
            return res.status(401).send("Room already exits");
         }
         else{
            var room = new Rooms({
                story_id: req.body.story_id,
                recipient_id: req.body.recipient_id,
                creation_date: currDate,
                creation_time: currTime
            });
        
            room.save((err, doc) => {
                if (!err) {
                    res.send(doc);
                }
                else {
                    console.log(err);
                }
            });
         }
      
    })
    
    
})

module.exports = router;