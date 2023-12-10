const Clinic = require("../models/Clinic.js");

module.exports = {
  updateClinic: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedClinic = await Clinic.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      ).select("-password");

      return res.status(200).json({
        success: true,
        message: "successfully updated",
        data: updatedClinic,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "failed to update Clinic",
      });

      console.log(err);
    }
  },
  deleteClinic: async (req, res) => {
    const id = req.params.id;
    try {
      const deleteClinic = await Clinic.findByIdAndDelete(id).select(
        "-password"
      );

      return res.status(200).json({
        success: true,
        message: "successfully delete",
        data: deleteClinic,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "failed to delete",
      });

      console.log(err);
    }
  },
  getSingleClinic: async (req, res) => {
    const id = req.params.id;
    try {
      const singleClinic = await Clinic.findById(id).select("-password");

      return res.status(200).json({
        success: true,
        message: "user found",
        data: singleClinic,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "user not found ",
      });

      console.log(err);
    }
  },
  getAllClinic: async (req, res) => {
    const id = req.params.id;
    try {
      const allClinic = await Clinic.find({}).select("-password");

      return res.status(200).json({
        success: true,
        message: "users found ",
        data: allClinic,
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
