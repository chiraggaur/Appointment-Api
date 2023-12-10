var express = require("express");
var {
  updatePatient,
  deletePatient,
  getSinglePatient,
  getAllPatient,
} = require("../Controllers/patientController.js");
// import {register,login} from "../Controllers/authController.js";

var { authenticate, restrict } = require("../auth/verifyToken.js");

const router = express.Router();

router.get("/:id", authenticate, restrict(["patient"]), getSinglePatient);
router.put("/:id", authenticate, restrict(["admin"]), updatePatient);
router.get("/", authenticate, restrict(["patient"]), getAllPatient);
router.delete("/:id", authenticate, restrict(["patient"]), deletePatient);

module.exports = router;
