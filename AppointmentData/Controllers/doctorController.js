const Doctor = require("../models/Doctor.js");

module.exports = {
  updateDoctor: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      ).select("-password");

      return res.status(200).json({
        success: true,
        message: "successfully updated",
        data: updatedDoctor,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "failed to update",
      });

      console.log(err);
    }
  },
  deleteDoctor: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedDoctor = await Doctor.findByIdAndDelete(id).select(
        "-password"
      );

      return res.status(200).json({
        success: true,
        message: "successfully delete",
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "failed to delete",
      });

      console.log(err);
    }
  },
  getSingleDoctor: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedDoctor = await Doctor.findById(id).select("-password");

      return res.status(200).json({
        success: true,
        message: "user found",
        data: updatedDoctor,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "user not found ",
      });

      console.log(err);
    }
  },
  getAllDoctor: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedDoctor = await Doctor.find({}).select("-password");

      return res.status(200).json({
        success: true,
        message: "users found ",
        data: updatedDoctor,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "all users not found ",
      });

      console.log(err);
    }
  },
};
