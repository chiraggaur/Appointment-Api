const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Clinic = require("../models/Clinic");
const Patient = require("../models/Patient");

// Get all appointments
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get details of a specific appointment
router.get("/appointments/:appointmentId", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get available appointments for a specific doctor
router.get("/available-appointments/:doctorId", async (req, res) => {
  try {
    // Implement logic to retrieve available appointments based on doctor's schedule
    // This is just a placeholder example, you may need to adjust it based on your use case
    const availableAppointments = await Appointment.find({
      doctorId: req.params.doctorId,
    });
    res.json(availableAppointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for a patient to register a new appointment
router.post("/register-appointment", async (req, res) => {
  try {
    const { doctorId, patientId, clinicId, startTime, endTime } = req.body;

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(400).json({ message: "Doctor not found." });
    }

    // Check if the time slot is within the doctor's available time slots
    const isSlotAvailable = doctor.timeSlots.some((slot) => {
      return slot.startTime <= startTime && slot.endTime >= endTime;
    });

    if (!isSlotAvailable) {
      return res.status(400).json({
        message: "Selected time slot is not available for the doctor.",
      });
    }

    // Check if the time slot is not already booked
    const isTimeSlotBooked = await Appointment.findOne({
      doctorId,
      clinicId,
      $or: [
        {
          $and: [
            { "timeSlot.startTime": { $lte: startTime } },
            { "timeSlot.endTime": { $gte: startTime } },
          ],
        },
        {
          $and: [
            { "timeSlot.startTime": { $lte: endTime } },
            { "timeSlot.endTime": { $gte: endTime } },
          ],
        },
      ],
    });

    if (isTimeSlotBooked) {
      return res
        .status(400)
        .json({ message: "Selected time slot is already booked." });
    }

    // Create the appointment
    const appointment = new Appointment({
      doctorId,
      patientId,
      clinicId,
      timeSlot: { startTime, endTime },
    });

    await appointment.save();

    return res
      .status(201)
      .json({ message: "Appointment registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
