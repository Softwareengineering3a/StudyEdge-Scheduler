var should = require('should'), 
mongoose = require('mongoose'), 
Session = require('../models/SessionSchema'), 
Student = require('../models/StudentSchema'), 
config = require('../config/config.js');

mongoose.connect(config.db.uri, { useNewUrlParser: true });

var mySession, myStudent, sid, id;

mySession =  {
    date : 'Sun Nov 17 2019 14:41:53 GMT-0500 (Eastern Standard Time)',
    time : 1300,
    class : "Software Engineering",
    tutor : "Miranda Overstreet",
    location : "CSE352",
    slots : 420,
    notes : "This class sucks",
    title : "Testing",
    students : ["Jessy", "James", "Carly", "Carl"]
}

myStudent = {
  UFID : 51037655,
  Name : "Robert Rasmussen",
  Email : "myEmail@nunya.com",
  PhoneNumber : 1112223333,
}


  
describe('Session and Student Schema Unit Tests', function() {

  it('saves student properly when required elements are provided', function(done){
      new Student({
        UFID : myStudent.UFID,
        Name : myStudent.Name,
        Email : myStudent.Email,
        PhoneNumber : myStudent.PhoneNumber,
      }).save(function(err, myStudent){
        should.not.exist(err);
        sid = myStudent._id;
        done();
      });
    });

it('saves Session properly when required elements are provided', function(done){
    new Session({
      date: mySession.date, 
      class: mySession.class,
      tutor: mySession.tutor,
      location: mySession.location,
      slots: mySession.slots,
      notes: mySession.notes,
      title: mySession.title,
      students: mySession.students
    }).save(function(err, mySession){
      should.not.exist(err);
      id = mySession._id;
      done();
    });
  });

});