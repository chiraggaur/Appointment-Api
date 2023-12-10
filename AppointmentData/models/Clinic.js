let mongoose = require("mongoose");
const { SchemaType } = require("mongoose");

const Schema = mongoose.Schema;

const clinicSchema = new Schema(
  {
    name: { type: String },
    address: { type: String },
    email: { type: String },
    password: { type: String },
    doctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
  },
  { timestamps: true }
);

const Clinic = mongoose.model("Clinic", clinicSchema);

module.exports = Clinic;
