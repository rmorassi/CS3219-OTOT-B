/* ----- IMPORTS ----- */

var mongoose = require('mongoose');


/* ----- SCHEMA SPECIFICATION ----- */

var StudentModelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    roomNumber: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: false,
        default: 'undisclosed'
    },
});

// Export Student model
var Student = module.exports = mongoose.model('StudentModel', StudentModelSchema);
module.exports.get = function (callback, limit) {
    Student.find(callback).limit(limit);
}