const express = require("express");

// import jwtauth
const jwtAuth = require("../middlewares/JWTauth");

// import authorization
const { isWorker } = require("../middlewares/authorization");
const { workExpdelete } = require("../controllers/workExp.controller");

const router = express.Router();

router.delete("/work-exp/:id", jwtAuth, isWorker, workExpdelete); // for delete work exp

module.exports = router;
