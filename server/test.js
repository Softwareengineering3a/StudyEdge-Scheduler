var should = require('should'), 
mongoose = require('mongoose'), 
Reservation = require('./ReservationSchema'), 
config = require('./config/config.js');

mongoose.connect(config.db.uri, { useNewUrlParser: true });

var myReservation,  id;

myReservation =  {
    date : "11/7/2019",
    time : 1300,
    class : "Software Engineering",
    tutor : "Jack Rasmussen",
    location : "NEB1337"
}

describe('Reservation Schema Unit Tests', function() {
it('saves properly when required elements are provided', function(done){
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

  afterEach(function(done) {
    if(id) {
        myReservation.deleteOne({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});