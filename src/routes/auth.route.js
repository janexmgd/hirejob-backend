const express = require("express");
const { workerRegister, workerLogin } = require("../validations/auth");
const validation = require("../middlewares/validation");

// for controller import
const {
  registerWorker,
  verifyEmail,
  loginWorker,
} = require("../controllers/auth.controller");

const router = express.Router();

router
  .post("/auth/register-worker", workerRegister, validation, registerWorker) // worker register
  .get("/auth/verify-email", verifyEmail) //email verify endpoint
  .post("/auth/login-worker", workerLogin, validation, loginWorker); // login worker
module.exports = router;
