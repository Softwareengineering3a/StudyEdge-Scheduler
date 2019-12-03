var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var SessionSchema = new Schema({

  date : {type : Date, required : true},
  class : {type : String, required : true},
  location : {type : String, required : true},
  tutor : {type : String, required : true},
  slots : {type : Number, required : true},
  notes : {type: String, required : false},
  title : {type: String, required : true},
  students : [Schema.Types.Mixed],

});

SessionSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
      this.created_at = currentDate;
  }
  next();
});

var Session = mongoose.model('Session', SessionSchema);
module.exports = Session;