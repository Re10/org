var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var regi = new Schema({
    name: {
        type: String,
        required: true
    },
    mob: String,
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('regi', regi);

