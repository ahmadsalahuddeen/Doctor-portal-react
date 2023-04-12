const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const login = async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
    return  res.status(200).send({ message: `user doesn't exist`, success: false });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
    return  res
        .status(200)
        .send({ message: `Password doesn't match`, success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

    return  res
        .status(200)
        .send({ message: "login successfull", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Failed to login ", success: false, error });
  }
};

const register = async (req, res) => {
  try {
    const isUserExist = await User.findOne({ email: req.body.email });
    if (isUserExist) {
      return res
        .status(200)
        .send({ message: "user already exist", success: false });
    }
    const password = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password,
    });
    await user.save();
    res.status(200).send({ message: "user created succefully", success: true });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send({ message: "error creating user", success: false, error });
  }
};

const getUserInfo = async (req, res)  =>{

  console.log(req.body.userId)
  try {
   const user = await User.findOne({_id: req.body.userId})
   user.password = ''
if (!user) {
  return  res.status(200).send({message: `user doesn't exist `, success: false})
} else {

 return res.status(200).send({message: 'nicee', success: true, data:user})
}

  } catch (error) {
    res.status(401).send({message:'failed to get user info', success: false, error})
  }
}


module.exports = {
  login,
  register,
  getUserInfo

};
