const express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;
var {Users} = require('./../models/userModel');
const jwt = require('jsonwebtoken');




router.get('/',(req,res) => {
    Users.find((err,docs)=>{
        if(!err)
         res.send(docs);
        else
         console.log(err);
    })
});

 
router.post('/', (req,res) => {
    var users = new Users({
        user_name: req.body.user_name,
        email_id: req.body.email_id,
        user_password: req.body.user_password,
        mob_no: req.body.mob_no,
    });

    users.save((err, docs) => {
        if (!err) {
            // let payload = { subject: user._id };
            // let token = jwt.sign(payload, 'secretKey')
            res.send(docs);
        }
        else {
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const token = req.params.id;
    let payload = jwt.verify(token, 'secretKey');
    const params = payload.subject;
    Users.findOne({ _id: params }, (err, user) => {
        if (!user) {
            console.log(err);

        }

        else {
            res.send({
                _id: user._id,
                user_name: user.user_name
            });
        }
    })

});

router.post('/login', (req, res) => {
    Users.findOne({ email_id: req.body.email_id }, (err, user) => {
        if (err) {
            console.log("Error");
        }
        else
            if (!user) {
                res.status(401).send('Invalid Email');
            }
            else
                if (user.user_password !== req.body.user_password) {
                    res.status(401).send('Invalid Password');
                }
                else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token });
                }
    })
})





module.exports = router;