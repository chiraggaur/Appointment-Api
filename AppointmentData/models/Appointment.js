// let mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const appointmentSchema = new Schema(
//   {
//     clinicId: { type: Schema.Types.ObjectId, ref: "Clinic" },
//     doctorId: { type: Schema.Types.ObjectId, ref: "Doctor" },
//     patientId: { type: Schema.Types.ObjectId, ref: "Doctor" },
//     timeSlot: {
//       startTime: { type: Number, required: true },
//       endTime: { type: Number, required: true },
//     },
//   },
//   { timestamps: true }
// );

// const Appoinment = mongoose.model("Appointment", appointmentSchema);

// module.exports = Appoinment;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    clinicId: { type: Schema.Types.ObjectId, ref: "Clinic", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    timeSlot: {
      startTime: { type: Number, required: true },
      endTime: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
