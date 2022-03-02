const express = require('express');
const multer = require('multer');
var router = express.Router();
var {Story} = require('./../models/storyModel');
var story_id = require('mongoose').Types.ObjectId;
const moment = require('moment');
const currDate = moment().format('DD-MM-YYYY');
const currTime = moment().format('hh:mm');


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './FilesUpload/DocumentProofs');
    },

    filename: function (req, file, callback) {
        callback(null, currDate + file.originalname);
    }

});


// const fileFilter = (req, file, callback) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         callback(null, true);
//     }
//     else {
//         callback(null, false);
//     }

// };
const uploads = multer({
    storage: storage
    // limits: {
    //     fieldSize: 1024 * 1024 * 8
    // }
});
  //var uploadDocuments = uploads.fields({name:'documents_proof',maxCount:'10'})


router.get('/',(req,res) =>{
    Story.find((err,docs)=>{
        if(!err)
         res.send(docs);
        else
         console.log(err);
    })
})


router.get('/:id', (req, res) => {
    if (!story_id.isValid(req.params.id)) {
        return res.status(400).send('No records found at:', `${req.params.id}`);
    }
    Story.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log(err);
        }
    });

});
router.post('/',uploads.any('documents_proof'),(req,res) =>{
    const filesArray =[];
    for(let i=0; i<req.files.length; i++)
      filesArray.push(req.files[i].path);

console.log(req.files);
    var story = new Story({
        story_title : req.body.story_title,
        recipient_name : req.body.recipient_name,
        story_description : req.body.story_description,
        creation_date : currDate,
        creation_time : currTime,
        isfundRequired : req.body.isfundRequired,
        user_id : req.body.user_id,
        user_name : req.body.user_name,
        documents_proof : filesArray,
        bank_name : req.body.bank_name,
        holder_name : req.body.holder_name,
        account_number : req.body.account_number,
        ifsc_code : req.body.ifsc_code,
        upi_id : req.body.upi_id
        
    });

    story.save((err,docs) => {
        if(!err)
         res.send(docs);
        else
         console.log(err);
    });
});

router.patch('/:id',(req,res)=>{

if (!story_id.isValid(req.params.id)) {
    return res.status(400).send('No records found at:', `${req.params.id}`);
}
 Story.findById(req.params.id,function(err,data){
     data.updates.push({
        update_title : req.body.update_title,
        update_description : req.body.update_description,
        update_creation_date : currDate
     })
         
data.save((err,docs) => {
    if(!err)
     res.send(docs);
    else
     console.log(err);
});
 });




})

module.exports = router;
