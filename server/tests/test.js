var should = require('should'), 
mongoose = require('mongoose'), 
Reservation = require('../models/ReservationSchema'), 
Student = require('../models/StudentSchema'), 
config = require('../config/config.js');

mongoose.connect(config.db.uri, { useNewUrlParser: true });

var myReservation, myStudent, sid, id;

myReservation =  {
    date : "11/7/2019",
    time : 1300,
    class : "Computer Organization",
    tutor : "Miranda Overstreet",
    location : "CSE352"
}

myStudent = {
  UFID : 51037655,
  Name : "Robert Rasmussen",
  Email : "myEmail@nunya.com",
  PhoneNumber : 3528703042,
}



describe('Reservation and Student Schema Unit Tests', function() {

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

it('saves reservation properly when required elements are provided', function(done){
    new Reservation({
      date: myReservation.date, 
      time: myReservation.time,
      class: myReservation.class,
      location: myReservation.location
    }).save(function(err, myReservation){
      should.not.exist(err);
      id = myReservation._id;
      done();
    });
  });

});