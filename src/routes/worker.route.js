const express = require("express");

// import jwtauth
const jwtAuth = require("../middlewares/jwtAuth");

// import authorization
const { isWorker } = require("../middlewares/authorization");

// import controller
const {
  workerActive,
  workerDetail,
  workerPhoto,
  workerUpdate,
  workerSkill,
  workerWorkExp,
  workerPorto,
} = require("../controllers/worker.controller");

// import upload
const workerUpload = require("../middlewares/workerUploads");

const router = express.Router();
router
  .get("/worker", jwtAuth, isWorker, workerActive) // get all worker with status active
  .get("/worker/:id", jwtAuth, workerDetail) // get detail worker
  .put("/worker-photo", jwtAuth, isWorker, workerUpload, workerPhoto) // worker update photo
  .put("/worker", jwtAuth, isWorker, workerUpdate) // for update worker,skill, and experience
  .get("/worker-skill/:id", jwtAuth, isWorker, workerSkill) // for get skill by worker id
  .get("/worker-workexp/:id", jwtAuth, isWorker, workerWorkExp) // for get workExp by worker id
  .get("/worker-portofolio/:id", jwtAuth, isWorker, workerPorto); // for get portofolio by worker
module.exports = router;
