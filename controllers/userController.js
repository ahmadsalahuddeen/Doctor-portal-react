const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: `user doesn't exist`, success: false });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res
        .status(200)
        .send({ message: `Password doesn't match`, success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res
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

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = "";
    if (!user) {
      return res
        .status(200)
        .send({ message: `user doesn't exist `, success: false });
    } else {
      return res
        .status(200)
        .send({ message: "nicee", success: true, data: user });
    }
  } catch (error) {
    res
      .status(401)
      .send({ message: "failed to get user info", success: false, error });
  }
};

const doctorApplication = async (req, res) => {
  try {
    const newDoctor = new Doctor({ ...req.body, status: "Pending" });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const unseenNotification = {
      type: "new-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
      },
      onClickPath: "/admin/doctors",
    };

    await User.findByIdAndUpdate(adminUser._id, {
      $push: { unseenNotification },
    });
    res.status(200).send({
      message: "doctor application Applied Successfully",
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to post - apply dotor", success: false, error });
  }
};

const markNotifAsSeen = async (req, res) => {
  try {
    console.log('getting here')
    const userData = await User.findOne({ _id: req.body.userId });
    const unseenNotification = userData.unseenNotification;
    userData.seenNotifications.push(...unseenNotification);
    userData.unseenNotification = [];

    const response = await userData.save();
    response.password = undefined;

    res.status(200).send({
      message: "Notifications are marked as Seen 👀",
      success: true,
      data: response,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to mark notification as seen", success: false, error });
  }
};

const deleteSeenNotifications = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.body.userId });

    userData.seenNotifications = [];

    const response = await userData.save();
    response.password = undefined;

    res.status(200).send({
      message: "All notifications is Deleted 🙈",
      success: true,
      data: response,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "failed to delete messages", success: false, error });
  }
};

module.exports = {
  login,
  register,
  getUserInfo,
  deleteSeenNotifications,
  doctorApplication,
  markNotifAsSeen,
};
