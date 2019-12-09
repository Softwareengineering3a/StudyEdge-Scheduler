var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var StudentSchema = new Schema({
  //Necessary fields for student
  UFID : {type : Number, required : true}, //Unique UF ID number 
  Name : {type : String, required : true}, //Name of the student
  Email : {type : String, required : true}, //Email for the student
  pNumber : {type : Number, required : true, //Phone number of the student
  Notes : {type : String, required : false} //Notes student gives when reserving session for the session tutor

});

StudentSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
      this.created_at = currentDate;
  }
  next();
});

var Student = mongoose.model('Student', StudentSchema);
module.exports = Student;