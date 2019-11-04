let Session = require('../models/bookSession.js'),
    mongoose = require('mongoose')

    exports.create = function(req,res){
        let session = new Session(req.body);

        session.save(function(err){
            if(err) {
                console.log(err);
                res.status(404);
            } else {
                res.json(session);
                console.log(session);
            }
        });
    };

    exports.read = function(req,res) {
        res.json(req.session);
    };

    exports.update = function(req,res) {
        session.sessionTitle = req.body.sessionTitle;
        session.Course = req.body.Course;
        session.Location = req.body.Location;
        session.Date = req.body.Date;
        session.Time = req.body.Time;
        session.Slots = req.body.Slots;
        session.Notes = req.body.Notes;

        session.save(function(err){
            if(err){
                console.log(err)
                res.status(400).send(err);
            } else{
                res.json(session);
            }
        });
    };

    exports.delete = function(req, res) {
        let listing = req.session;
      
        session.remove(function(err) {
          if (err) {
            console.log(err);
            res.status(404).send(err);
          } else{
            res.end();
          }
        })
      };