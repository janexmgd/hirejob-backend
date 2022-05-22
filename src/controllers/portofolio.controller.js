const { success, failed } = require("../helpers/response");

const portofolioModel = require("../models/portofolio.model");
const deleteFile = require("../utils/deleteFile");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  portofolioInsert: async (req, res) => {
    try {
      const workerId = req.APP_DATA.tokenDecoded.workerid;
      const id = uuidv4();
      const { appName, linkRepo, type } = req.body;

      if (!req.file) {
        const err = {
          message: "Image is required",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
      const image = req.file.filename;
      const data = {
        id,
        appName,
        workerId,
        linkRepo,
        type,
        image,
      };
      await portofolioModel.portofolioInsert(
        id,
        appName,
        workerId,
        linkRepo,
        type,
        image
      );
      success(res, {
        code: 200,
        status: "success",
        message: "success create portofolio",
        data: data,
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
  portofolioDelete: async (req, res) => {
    try {
      const id = req.params.id;
      // const workerId = req.APP_DATA.tokenDecoded.workerid;
      const portofolioDetail = await portofolioModel.portofolioDetailData(id);
      deleteFile(
        `./public/uploads/portofolio/${portofolioDetail.rows[0].image}`
      );
      const portofolioDelete = await portofolioModel.portofolioDeleteData(id);
      if (portofolioDelete.rowCount === 0) {
        const err = {
          message: `work experience with ${id} not found`,
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
        message: `delete work experience with id ${id} success`,
        data: portofolioDelete.rows[0],
        paggination: [],
      });
    } catch (err) {
      failed(res, {
        code: 500,
        status: "error",
        message: err.message,
        error: [],
      });
      return;
    }
  },
};
