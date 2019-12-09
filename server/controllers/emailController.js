var { DateTime } = require('luxon')

nodemailer = require('nodemailer'),
mongoose = require('mongoose'),
config = require('../config/config.js');

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true}); //Connect database

var express = require('express');
var eRoute = express.Router();

//Set up email service
let transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    //Email for user - messages will be sent from this email
    user: 'studyedgescheduler@gmail.com',
    //Email password for user
    pass: config.EmailPass
  }
});


eRoute.post('/', (req, res, next) => { 
  var email = req.body.email; //Student email address
  var session = req.body.session; //Study Edge session object
  var note = req.body.note; //Message specified by admin upon notification
  
  //Message that will be sent to Study Edge members upon notification
  var txt = `Hello Study Edge member!\n\nYour Study Expert sent you a notification about your Study Edge reservation that is coming up on ${DateTime.fromISO(session.date).toFormat('ff')} for ${session.class}.\n\nNotification: ${note}`

  //Create new message from scheduler email to student email
  const message = {
    from: 'studyedgescheduler@gmail.com',
    to: email,
    subject: 'Upcoming Study Session Notification', //Subject for email to be sent
    text: txt //Email text
  };

  //Sends email message created in previous step
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log('Email sent' + info);
      res.status(200);
    }
  });

});

module.exports = eRoute;