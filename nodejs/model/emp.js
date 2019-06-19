var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emp = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mob: String,
    dob: Date,
    addr: String,
    state: String,
    city: String,
    zip: String,
    gender: String,
    hobbies: Array,
    skills: Array,
    salary: String,
    myImg: String
});
module.exports = mongoose.model('emp', emp);

