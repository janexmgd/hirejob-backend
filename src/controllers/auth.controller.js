// import package
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const authModel = require("../models/auth.model");
const jwtToken = require("../helpers/generateJWTtoken");

// import helpers
const { success, failed } = require("../helpers/response");
const sendEmail = require("../helpers/sendEmail");
module.exports = {
  registerRecruiter: async (req, res) => {
    try {
      const { name, email, password, phone, companyName, position } = req.body;

      // for name check
      const nameCheck = await authModel.recruiterNameCheck(name);
      if (nameCheck.rowCount > 0) {
        const err = {
          message: "Name is already registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }

      // for email check
      const emailCheck = await authModel.emailCheck(email);
      if (emailCheck.rowCount > 0) {
        const err = {
          message: "Email is already registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
      const authid = uuidv4();
      const passwordHashed = await bcrypt.hash(password, 10);
      const verifyToken = crypto.randomBytes(64).toString("hex");
      const isVerified = 0;
      // const verifyToken = null;
      // const isVerified = 1;

      const level = 1;

      const dataAuth = {
        authid,
        email,
        passwordHashed,
        verifyToken,
        isVerified,
        level,
      };
      // to auth table
      await authModel.registerAuth(dataAuth);

      // to worker table
      const recruiterId = uuidv4();
      const isActive = 1;
      const image = "default.png";
      const dataRecruiter = {
        recruiterId,
        name,
        companyName,
        position,
        phone,
        image,
        authid,
        isActive,
      };
      await authModel.registerRecruiterData(dataRecruiter);
      sendEmail.sendConfirmationEmail(email, verifyToken, name);
      success(res, {
        code: 200,
        status: "success",
        message: "Registered sucesss, please activate your email",
        data: dataRecruiter,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  registerWorker: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;

      // for name check
      const nameCheck = await authModel.nameCheck(name);
      if (nameCheck.rowCount > 0) {
        const err = {
          message: "Name is already registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }

      // for email check
      const emailCheck = await authModel.emailCheck(email);
      if (emailCheck.rowCount > 0) {
        const err = {
          message: "Email is already registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
      const authid = uuidv4();
      const passwordHashed = await bcrypt.hash(password, 10);
      const verifyToken = crypto.randomBytes(64).toString("hex");
      const isVerified = 0;
      // const verifyToken = null;
      // const isVerified = 1;

      const level = 0;

      const dataAuth = {
        authid,
        email,
        passwordHashed,
        verifyToken,
        isVerified,
        level,
      };
      // to auth table
      await authModel.registerAuth(dataAuth);

      // to worker table
      const workerid = uuidv4();
      const isActive = 1;
      const image = "default.png";
      const dataWorker = {
        workerid,
        name,
        phone,
        image,
        authid,
        isActive,
      };
      await authModel.registerWorker(dataWorker);
      sendEmail.sendConfirmationEmail(email, verifyToken, name);
      success(res, {
        code: 200,
        status: "success",
        message: "Registered sucesss, please activate your email",
        data: dataWorker,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const { token } = req.query;
      const verifyTokenCheck = await authModel.verifyTokenCheck(token);
      if (verifyTokenCheck.rowCount > 0) {
        authModel
          .verifyingUser(token)
          .then((result) => {
            success(res, {
              code: 200,
              status: "success",
              message: "email is activated",
              data: [],
              paggination: [],
            });
          })
          .catch((err) => {
            failed(res, {
              code: 500,
              status: "error",
              message: err.message,
              error: [],
            });
          });
      } else {
        const err = {
          message: "verify token is invalid",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: "failed",
        message: error.message,
        error: [],
      });
    }
  },
  loginWorker: async (req, res) => {
    try {
      const { email, password } = req.body;
      const emailCheck = await authModel.emailCheck(email);
      // cek apakah sudah register?
      if (emailCheck.rowCount >= 1) {
        // cek apakah sudah veifikasi email
        if (
          emailCheck.rows[0].verify_code === null ||
          emailCheck.rows[0].verify_code == "null"
        ) {
          // cek apakah akun active?
          const activeCheck = await authModel.activeCheck(
            emailCheck.rows[0].id
          );
          if (activeCheck.rowCount > 0) {
            if (activeCheck.rows[0].is_active == 1) {
              bcrypt
                .compare(password, emailCheck.rows[0].password)
                .then(async (match) => {
                  // compare berhasil?
                  if (match) {
                    // login sukses dan memberi token
                    const dataWorkerAuth = await authModel.authWorkerData(
                      emailCheck.rows[0].id
                    );

                    const token = await jwtToken(dataWorkerAuth.rows[0]);
                    success(res, {
                      code: 200,
                      status: "success",
                      message: "login success",
                      token: token,
                    });
                  } else {
                    // login gagal
                    const err = {
                      message: "wrong email or password",
                    };
                    failed(res, {
                      code: 500,
                      status: "error",
                      message: err.message,
                      error: [],
                    });
                  }
                });
            } else {
              const err = {
                message: "your account is disabled",
              };
              failed(res, {
                code: 500,
                status: "error",
                message: err.message,
                error: [],
              });
            }
          } else {
            const recruiterActiveCheck = await authModel.recruiterActiveCheck(
              emailCheck.rows[0].id
            );
            if (recruiterActiveCheck.rows[0].is_active == 1) {
              bcrypt
                .compare(password, emailCheck.rows[0].password)
                .then(async (match) => {
                  // compare berhasil?
                  if (match) {
                    // login sukses dan memberi token
                    const dataRecruiterAuth = await authModel.authRecruiterData(
                      emailCheck.rows[0].id
                    );

                    const token = await jwtToken(dataRecruiterAuth.rows[0]);
                    success(res, {
                      code: 200,
                      status: "success",
                      message: "login success",
                      token: token,
                    });
                  } else {
                    // login gagal
                    const err = {
                      message: "wrong email or password",
                    };
                    failed(res, {
                      code: 500,
                      status: "error",
                      message: err.message,
                      error: [],
                    });
                  }
                });
            } else {
              const err = {
                message: "your account is disabled",
              };
              failed(res, {
                code: 500,
                status: "error",
                message: err.message,
                error: [],
              });
            }
          }
        } else {
          const err = {
            message: "e-mail is not verified",
          };
          failed(res, {
            code: 500,
            status: "error",
            message: err.message,
            error: [],
          });
        }
      } else {
        const err = {
          message: "email not registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
};
