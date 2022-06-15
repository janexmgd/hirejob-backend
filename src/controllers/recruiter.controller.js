const { success, failed } = require("../helpers/response");

const recruiterModel = require("../models/recruiter.model");
const deleteFile = require("../utils/deleteFile");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  recruiterDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await recruiterModel.recruiterDetailData(id);
      if (data.rowCount === 0) {
        const err = {
          message: `Recruiter with id ${id} not found`,
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
      success(res, {
        code: 200,
        status: "success",
        message: `Success get recruiter with id ${id}`,
        data: data.rows[0],
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
      return;
    }
  },
  recruiterUpdate: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.recruiterid;
      const {
        name,
        // email,
        // password,
        phone,
        companyName,
        position,
        companyField,
        kota,
        instagram,
        linkedin,
        companyDescription,
      } = req.body;
      await recruiterModel.recruiterUpdateData(
        id,
        name,
        // email,
        // password,
        phone,
        companyName,
        position,
        companyField,
        kota,
        instagram,
        linkedin,
        companyDescription
      );
      // return console.log(req.body);
      success(res, {
        code: 200,
        status: "success",
        message: "Update profile success",
        data: req.body,
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: "Failed",
        message: "Internal Server Error",
        error: error.message,
      });
      return;
    }
  },
};
