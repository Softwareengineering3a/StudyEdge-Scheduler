mongoose = require('mongoose'),
config = require('../config/config.js');

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true}); //Connect to database

var express = require('express');
var studentdelete = express.Router();
var Session = require('../models/SessionSchema');

//Function that deletes a student from a list of students in a session
studentdelete.post('/', (req,res) => {
    const students = req.body.session.students;
    var sessionid;
    //Loop through student list and find student to delete
    for(var i = 0; i < req.body.session.students.length; i++){
        if(req.body.session.students[i][0] == req.body.studentdelete){
            sessionid = req.body.session._id;
            var index = i;
            if (index > -1) {
                students.splice(index, 1); //Remove one student from list
                break;
            }
        }
    }
    //Update session with new list of students
    Session.findById(sessionid).then(session => {
        session.students = students;
        session.slots = req.body.session.slots;
        session.title = req.body.session.title;
        session.date = req.body.session.date; 
        session.time = req.body.session.time; 
        session.class = req.body.session.class;
        session.location = req.body.session.location;
        session.tutor = req.body.session.tutor;
        session.notes = req.body.session.notes;
        //Save updated session to database
        session.save(function(err) {
            if(err) {
            console.log(err);
            res.status(400).send(err);
            } else {
            res.json(session);
            }
        }); 
    }
    ).catch(err => {
        //Catch error if session not found
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });                
        }
        //Catch other error
        return res.status(500).send({
            message: "Error updating session with id " + req.params.sessionId
        });
    });

});

module.exports = studentdelete;