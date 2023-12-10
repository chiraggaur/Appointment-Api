const Patient = require("../models/Patient.js");
const Doctor = require("../models/Doctor.js");
const Clinic = require("../models/Clinic.js");
const jwt = require("jsonwebtoken");

module.exports = {
  authenticate: async (req, res, next) => {
    // get token from headers

    const authToken = req.headers.authorization;

    // check if token exists

    if (!authToken || !authToken.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ success: false, message: "No Token ,authorisation denied " });
    }

    try {
      const token = authToken.split(" ")[1];

      //verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token is Expired " });
      }
      return res
        .status(401)
        .json({ success: false, message: "Invalid Token " });
    }
  },
  restrict: (roles) => async (req, res, next) => {
    const userId = req.userId; // asssumes added by previous middleware

    let user;
    const patient = await Patient.findById(userId);
    const doctor = await Doctor.findById(userId);
    const clinic = await Clinic.findById(userId);
    // console.log("clinic:", clinic);

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    if (clinic) {
      user = clinic;
    }
    if (!roles.includes(user.role)) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorised" });
    }
    next();
  },
};
