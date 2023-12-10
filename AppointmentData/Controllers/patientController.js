const Patient = require("../models/Patient.js");

module.exports = {
  updatePatient: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedPatient = await Patient.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      ).select("-password");

      return res.status(200).json({
        success: true,
        message: "successfully updated",
        data: updatedPatient,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "failed to update",
      });

      console.log(err);
    }
  },
  deletePatient: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedPatient = await Patient.findByIdAndDelete(id).select(
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
  getSinglePatient: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedPatient = await Patient.findById(id).select("-password");

      return res.status(200).json({
        success: true,
        message: "user found",
        data: updatedPatient,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "user not found ",
      });

      console.log(err);
    }
  },
  getAllPatient: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedPatient = await Patient.find({}).select("-password");

      return res.status(200).json({
        success: true,
        message: "users found ",
        data: updatedPatient,
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
