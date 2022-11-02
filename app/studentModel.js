/* ----- IMPORTS ----- */

import mongoose from 'mongoose';


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
export default mongoose.model('StudentModel', StudentModelSchema);