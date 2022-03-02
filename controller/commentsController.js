const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var story_id = require('mongoose').Types.ObjectId;
var { Users } = require('./../models/userModel');
var { Story } = require('./../models/storyModel');
var { Comments } = require('./../models/commentsModel');
const moment = require('moment');
const currDate = moment().format('DD MMM` YY');
const currTime = moment().format('hh:mm');

router.get('/:id', (req, res) => {
    if (!story_id.isValid(req.params.id)) {
        return res.status(400).send('No records found at:', `${req.params.id}`);
    }


    Comments.find({ story_id: req.params.id }, (err, doc) => {

        if (!err) {
            res.send(doc);
        }
        else {
            console.log(err);
        }



    });
});



router.post('/:id', (req, res) => {
    var comments = new Comments({
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        story_id: req.body.story_id,
        user_comment: req.body.user_comment,
        creation_date: currDate,
        creation_time: currTime
    });

    comments.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log(err);
        }
    });
})

module.exports = router;