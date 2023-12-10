let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSlotSchema = new Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const doctorSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
    age: { type: Number },
    // roles for doctor only
    specialisation: { type: String, required: true },
    timeSlots: { type: [timeSlotSchema], required: true },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
