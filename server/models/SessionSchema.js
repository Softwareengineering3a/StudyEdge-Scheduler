var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var SessionSchema = new Schema({
  //Necessary fields for session
  date : {type : Date, required : true}, //Date on which the session will take place
  class : {type : String, required : true}, //Class that the session is for
  location : {type : String, required : true}, //Where the session will be located
  tutor : {type : String, required : true}, //Tutor who will be hosting session
  slots : {type : Number, required : true}, //Number of available slots for students
  notes : {type: String, required : false}, //Any additional notes for the session
  title : {type: String, required : true}, //Descriptive title of session that describes what will be covered
  //List of students currently in session
  students : [{
    type: Schema.Types.Mixed,
    required: true
  }] 

});

SessionSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
      this.created_at = currentDate;
  }
  next();
});

//Create mongoose model for database
var Session = mongoose.model('Session', SessionSchema);
module.exports = Session;