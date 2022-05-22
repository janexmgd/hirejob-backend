const express = require("express");

// import jwtauth
const jwtAuth = require("../middlewares/jwtAuth");

// import authorization
const { isWorker } = require("../middlewares/authorization");

// import controller
const {
  portofolioInsert,
  portofolioDelete,
} = require("../controllers/portofolio.controller");

// import middlewares
const portofolioUpload = require("../middlewares/portofolioUploads");
const validation = require("../middlewares/validation");

const { portoInsert } = require("../validations/portofolio");

const router = express.Router();

router
  .post(
    "/portofolio",
    jwtAuth,
    isWorker,
    portofolioUpload,
    portoInsert,
    validation,
    portofolioInsert
  ) // for add portofolio
  .delete("/portofolio/:id", jwtAuth, isWorker, portofolioDelete); // for delete portofolio
module.exports = router;
