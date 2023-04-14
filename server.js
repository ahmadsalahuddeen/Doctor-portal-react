const express = require('express');
const app = express()
require('dotenv').config()
const db = require('./config/dbConfig')
const port = process.env.PORT || 5000;

app.use(express.json())

// route import
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')

app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)

console.log(process.env.DATABASE_URL);
app.listen(port, ()=> console.log(`🌐 server started succesfully in http://localhost:${port}`));