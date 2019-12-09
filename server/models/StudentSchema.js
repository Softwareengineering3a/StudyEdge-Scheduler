var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var StudentSchema = new Schema({

  UFID : {type : Number, required : true},
  Name : {type : String, required : true},
  Email : {type : String, required : true},
  pNumber : {type : Number, required : true,
  Notes : {type : String, required : false}

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