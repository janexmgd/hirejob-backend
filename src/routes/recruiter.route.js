const express = require("express");

// import jwtauth
const jwtAuth = require("../middlewares/JWTauth");

// import authorization
const { isWorker, isRecruiter } = require("../middlewares/authorization");

// import controller
const {
	recruiterDetail,
	recruiterUpdate,
	recruiterPhoto,
} = require("../controllers/recruiter.controller");

//import upload
const recruiterUpload = require("../middlewares/recruiterUploads");

const router = express.Router();
router
	.get("/recruiter/:id", jwtAuth, recruiterDetail) // detail
	.put("/recruiter", jwtAuth, isRecruiter, recruiterUpdate) // update
	.put(
		"/recruiter-photo",
		jwtAuth,
		isRecruiter,
		recruiterUpload,
		recruiterPhoto
	);

module.exports = router;
