var express = require("express");
var {
  updateClinic,
  deleteClinic,
  getSingleClinic,
  getAllClinic,
} = require("../Controllers/clinicController.js");
// import {register,login} from "../Controllers/authController.js";

const router = express.Router();
var { authenticate } = require("../auth/verifyToken.js");

router.get("/:id", authenticate, getSingleClinic);
router.put("/:id", authenticate, updateClinic);
router.get("/", authenticate, getAllClinic);
router.delete("/:id", authenticate, deleteClinic);

module.exports = router;
