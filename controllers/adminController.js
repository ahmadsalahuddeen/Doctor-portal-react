const Doctor = require("../models/doctorModel")
const User = require("../models/userModel")

const getUsersList = async(req, res) => {
    try {
        const userData = await User.find()
if (userData) {
    
    res.status(200).send({message: 'User List Loaded', success: true, data: userData})
} else {
    
    res.status(200).send({message: 'Failed to load userList - server', success: false})
}


    } catch (error) {
        res.status(500).send({message: 'Error while getting user List', success: false, error})
    }
}
const getDoctorsList = async(req, res) => {
    try {
        const userData = await Doctor.find()
if (userData) {
    
    res.status(200).send({message: 'User List Loaded', success: true, data: userData})
} else {
    
    res.status(200).send({message: 'Failed to load userList - server', success: false})
}


    } catch (error) {
        res.status(500).send({message: 'Error while getting user List', success: false, error})
    }
}

module.exports = {
    getUsersList,
    getDoctorsList
}