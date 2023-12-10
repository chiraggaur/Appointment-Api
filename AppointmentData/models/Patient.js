let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
    age: { type: Number },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
