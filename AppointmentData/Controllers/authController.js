const Patient = require("../models/Patient.js");
const Doctor = require("../models/Doctor.js");
const Clinic = require("../models/Clinic.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role }, // payload
    process.env.JWT_SECRET_KEY, // key
    {
      expiresIn: "15d",
    }
  );
};

module.exports = {
  register: async (req, res) => {
    const {
      email,
      password,
      name,
      role,
      photo,
      gender,
      specialisation,
      address,
    } = req.body;
    try {
      let user = null;

      if (role === "patient") {
        user = await Patient.findOne({ email });
      } else if (role === "doctor") {
        user = await Doctor.findOne({ email });
      } else if (role === "clinic") {
        user = await Clinic.findOne({ email });
      }

      // check if user exists
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);

      if (role === "patient") {
        user = new Patient({
          name,
          email,
          password: hashpassword,
          photo,
          gender,
          role,
        });
      }

      if (role === "doctor") {
        user = new Doctor({
          name,
          email,
          password: hashpassword,
          photo,
          gender,
          role,
          specialisation,
        });
      }

      if (role === "clinic") {
        user = new Clinic({
          name,
          email,
          password: hashpassword,
          photo,
          gender,
          role,
          address,
        });
      }

      await user.save();

      res
        .status(200)
        .json({ success: true, message: "User is Successfully Created" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error, try again" });
    }
  },
  login: async (req, res) => {
    try {
      const { email } = req.body;
      let user = null;

      const patient = await Patient.findOne({ email });
      const doctor = await Doctor.findOne({ email });
      const clinic = await Clinic.findOne({ email });

      if (patient) {
        user = patient;
      }
      if (doctor) {
        user = doctor;
      }
      if (clinic) {
        user = clinic;
      }
      console.log(user);

      // check if user not exist
      if (!user) {
        return res.status(404).json({ message: "User not Found" });
      }

      // compare password
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid credentials" });
      }
      // get token
      const token = generateToken(user);

      // extract details from user field
      const { password, role, ...rest } = user._doc;
      res.status(200).json({
        success: true,
        message: "Successfully login",
        data: { ...rest },
        role,
        token,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error, try again" });
    }
  },
};
