const express = require("express");

// import jwtauth
const jwtAuth = require("../middlewares/JWTauth");

// import authorization
const { isWorker, isRecruiter } = require("../middlewares/authorization");

// import controller
const {
  recruiterDetail,
  recruiterUpdate,
} = require("../controllers/recruiter.controller");

const router = express.Router();
router
  .get("/recruiter/:id", jwtAuth, recruiterDetail) // detail
  .put("/recruiter", jwtAuth, isRecruiter, recruiterUpdate); // update

module.exports = router;
