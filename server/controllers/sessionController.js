var mongoose = require('mongoose'), 
    Session = require('../models/SessionSchema');

//Function to create a new session in the database using the SessionSchema 
exports.create = function(req, res) {
    //Uses information provided in http request body to create new session
    var session = new Session(req.body);
    session.save(function(err) {
      //If error while saving to database print error message and send 400
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(session);
        console.log(session)
      }
    });
};

//Function to read a session
exports.read = function(req, res) {
    res.json(req.session);
};

//Function to list all of the available sessions in the database
exports.list = function(req, res) {
    Session.find()
    .then(sessions => {
        res.send(sessions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving sessions."
        });
    });
};

//Function to update a session in the database
exports.update = (req, res) => {
    //Finds session with unique ID
    Session.findById(req.params.sessionId).then(session => {
        if(!session) {
            //Session with particular unique ID not found
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });
        }
        else{
            //update all values of particular session
            if(req.body.students!=null){
                session.students.push(req.body.students);
            }
            session.slots = req.body.slots;
            session.title = req.body.title;
            session.date =req.body.date; 
            session.time = req.body.time; 
            session.class = req.body.class;
            session.location = req.body.location;
            session.tutor = req.body.tutor;
            session.notes = req.body.notes;
            //Save updated session back to database
            session.save(function(err) {
                if(err) {
                console.log(err);
                res.status(400).send(err);
                } else {
                res.json(session);
                }
            }); 
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });                
        }
        return res.status(500).send({
            message: "Error updating session with id " + req.params.sessionId
        });
    });
};

//Function to delete a session from the database
exports.delete = (req, res) => {
    //Find session by unique ID and remove from database
    Session.findByIdAndRemove(req.params.sessionId)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });
        }
        res.send({message: "Session deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });                
        }
        return res.status(500).send({
            message: "Could not delete session with id " + req.params.sessionId
        });
    });
};

//Find a session by ID
exports.sessionByID = function(req, res, next, id) {
    Session.findById(id).exec(function(err, session) {
      if(err) {
        res.status(400).send(err);
      } else {
        req.session = session;
        next();
      }
    });
};
  