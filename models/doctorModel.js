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
   
  
    mobileNumber: {
        type: String, 
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    specialization: {
        
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
    timings: {
        type: [],
        required: true
    },
   status:{
    type: String,
    default: 'Pending'
   }
   
}, {timestamps: true})

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor