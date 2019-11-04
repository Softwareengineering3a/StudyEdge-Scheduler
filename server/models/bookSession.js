let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let bookingSchema = new Schema({
    sessionTitle: {
        type: String,
        required: true
    },
    Course: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    Time: {
        type: Time,
        required: true
    },
    Slots: {
        type: String,
        required: true
    },
    Notes: String
});

let booking = mongoose.model('BookedSession', bookingSchema);

module.exports = booking;