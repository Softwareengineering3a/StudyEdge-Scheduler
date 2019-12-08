var mongoose = require('mongoose'), 
    Session = require('../models/SessionSchema');

exports.create = function(req, res) {
    console.log(req.body);
    var session = new Session(req.body);
    session.save(function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(session);
        console.log(session)
      }
    });
  };

exports.read = function(req, res) {
    res.json(req.session);
};

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

exports.update = (req, res) => {
    Session.findById(req.params.sessionId).then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });
        }
        else{
            if(req.body.students!=null){
                session.students.push(req.body.students);
            }
            session.title = req.body.title;
            session.date =req.body.date; 
            session.time = req.body.time; 
            session.class = req.body.class;
            session.location = req.body.location;
            session.tutor = req.body.tutor; 
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

exports.delete = (req, res) => {
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
  