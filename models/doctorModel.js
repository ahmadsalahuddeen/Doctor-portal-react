const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String, 
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    feePerConsultation: {
        type: String,
        required: true
    },
    fromTime: {
        type: String,
        required: true
    },
    toTime: {
        type: String,
        required: true
    },
   
}, {timestamps: true})

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor