const express = require("express");
const {
  workerRegister,
  workerLogin,
  recruiterRegister,
} = require("../validations/auth");
const validation = require("../middlewares/validation");

// for controller import
const {
  registerWorker,
  verifyEmail,
  loginWorker,
  registerRecruiter,
} = require("../controllers/auth.controller");

const router = express.Router();

router
  .post("/auth/register-worker", workerRegister, validation, registerWorker) // worker register
  .post(
    "/auth/register-recruiter",
    recruiterRegister,
    validation,
    registerRecruiter
  ) // recruiter register

  .get("/auth/verify-email", verifyEmail) //email verify endpoint
  .post("/auth/login-worker", workerLogin, validation, loginWorker); // login worker
module.exports = router;
