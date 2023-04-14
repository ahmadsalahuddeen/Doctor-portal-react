const express   = require('express');
const route = express.Router()
const user = require('../controllers/adminController')
const auth = require('../middlewares/auth')

route.post('/login', user.login )


module.exports = route;
