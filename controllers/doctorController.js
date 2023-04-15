const  Doctor = require("../models/doctorModel");

    
const doctorInfo = async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ userId: req.query.id });
      user.password = "";
      if (!doctor) {
        return res
          .status(200)
          .send({ message: `can't load Doctor details `, success: false });
      } else {
        return res
          .status(200)
          .send({ message: "nicee", success: true, data: doctor });
      }
    } catch (error) {
      res
        .status(401)
        .send({ message: "failed to get Doctor info", success: false, error });
    }
  };

  module.exports = {
    doctorInfo
  }
