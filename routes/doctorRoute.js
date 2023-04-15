const route = require('express').Router()
const doctor = require('../controllers/doctorController')
const auth = require('../middlewares/auth')

route.get('/get-doctor-info-by-userId', auth, doctor.doctorInfo)




module.exports  = route;