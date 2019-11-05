let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let studentSchema = new Schema({
    name: String,
    ID: Number,
});

let student = mongoose.model('student', studentSchema);

module.exports = student;