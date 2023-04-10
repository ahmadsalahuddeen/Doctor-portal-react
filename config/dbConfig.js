const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("💿 Database connected ");
  })
  .catch((err) => { console.log('Failed to connect Database ⚠️', err.stack);});


  const connect = mongoose