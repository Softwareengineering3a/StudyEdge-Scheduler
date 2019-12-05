nodemailer = require('nodemailer'),
  mongoose = require('mongoose'),
  config = require('../config/config.js');

mongoose.connect(config.db.uri, { useNewUrlParser: true });

var express = require('express');
var eRoute = express.Router();

let transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'studyedgescheduler@gmail.com',
    pass: config.EmailPass
  }
});


eRoute.post('/', (req, res, next) => {
  var email = req.body.email

  const message = {
    from: 'studyedgescheduler@gmail.com',
    to: email,
    subject: 'You have an upcoming study session!', // Subject line
    text: 'Your Study expert sent your a reminder about your Studyedge reservation that is coming up soon' // Plain text body
  };

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent' + info);
    }
  });

});

module.exports = eRoute;