nodemailer = require('nodemailer'),
mongoose = require('mongoose'),
config = require('../config/config.js');

mongoose.connect(config.db.uri, { useNewUrlParser: true });

var thisSession = db.Sessions.find( { _id: { $in: /*get Session id from frontend*/ ""} });
var studentlist = [thisSession.students]; //create array of students from the current Session

var emailList = [studentlist.forEach(e => {
  return db.students.find( {
    Email: {$in : e}
  })
})]; // get email for each student in student array

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: 'studyedgescheduler@gmail.com',
       pass: 'StudyEdge3a'
    }
});

const message = {
    from: 'studyedgescheduler@gmail.com',
    to: emailList,         // make call to student database to fetch email
    subject: 'You have an upcoming study session!', // Subject line
    text: 'Your study session for' + thisSession.class + 
          'on' + thisSession.date +
          'is coming up soon! Get excited!' // Plain text body
};

transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent' + info);
    }
});