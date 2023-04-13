const express   = require('express');
const route = express.Router()
const user = require('../controllers/userController')
const auth = require('../middlewares/auth')

route.post('/login', user.login )
route.post('/register', user.register )
route.post('/apply-doctor-account', auth, user.doctorApplication )
route.post("/get-user-info-by-id", auth , user.getUserInfo)

module.exports = route;
