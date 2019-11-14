var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var ReservationSchema = new Schema({

  date : {type : String, required : true},
  time : {type : Number, required : true},
  class : {type : String, required : true},
  location : {type : String, required : true},
  tutor : {type : String, required : false},

});

ReservationSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
      this.created_at = currentDate;
  }
  next();
});

var Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;