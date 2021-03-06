const { failed } = require("../helpers/response");

module.exports = {
  isRecruiter: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 1) {
      next();
    } else {
      failed(res, {
        code: 500,
        status: "failed",
        message: "user dont have access",
        error: [],
      });
    }
  },
  isWorker: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 0) {
      next();
    } else {
      failed(res, {
        code: 500,
        status: "failed",
        message: "user dont have access",
        error: [],
      });
    }
  },
};
