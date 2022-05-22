const { success, failed } = require("../helpers/response");

const workerModel = require("../models/worker.model");
const deleteFile = require("../utils/deleteFile");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  workerActive: async (req, res) => {
    try {
      const { search, page, limit, sort, mode } = req.query;
      const searchQuery = search || "";
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 5;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : "name";
      const modeQuery = mode ? mode : "ASC";
      const allData = await workerModel.allWorkerActive();
      const totalData = Number(allData.rows[0].total);
      const data = {
        searchQuery,
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery,
      };
      const goQuery = await workerModel.workerActiveData(data);
      if (goQuery.rowCount === 0) {
        const err = {
          message: `data not found`,
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
      if (search) {
        const pagination = {
          currentPage: pageValue,
          dataPerPage: limitValue,
          totalPage: Math.ceil(goQuery.rowCount / limitValue),
        };
        success(res, {
          code: 200,
          status: "success",
          message: `Success get data worker`,
          data: goQuery.rows,
          pagination: pagination,
        });
      } else {
        const pagination = {
          currentPage: pageValue,
          dataPerPage: limitValue,
          totalPage: Math.ceil(totalData / limitValue),
        };

        success(res, {
          code: 200,
          status: "success",
          message: `Success get data worker`,
          data: goQuery.rows,
          pagination: pagination,
        });
      }
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
  workerDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await workerModel.workerDetailData(id);
      if (data.rowCount === 0) {
        const err = {
          message: `Worker with id ${id} not found`,
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
        message: `Success get Worker with id ${id}`,
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
  workerPhoto: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.workerid;
      const checkPhoto = await workerModel.workerGetImage(id);
      const fileImage = req.file.filename;
      if (checkPhoto.rows[0].photo == "default.png") {
        const result = await workerModel.workerUpdateImage(fileImage, id);
        success(res, {
          code: 200,
          status: "success",
          message: "Update Photo Success",
          data: result,
        });
      } else {
        const result = await workerModel.workerUpdateImage(fileImage, id);
        success(res, {
          code: 200,
          status: "success",
          message: "Update Photo Success",
          data: result,
        });
        deleteFile(`./public/uploads/worker/${checkPhoto.rows[0].photo}`);
        return;
      }
    } catch (error) {
      failed(res, {
        code: 400,
        status: "Failed",
        message: "Update photo failed",
        error: error.message,
      });
      return;
    }
  },
  workerUpdate: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.workerid;
      const {
        jobdesk,
        domisli,
        tempatKerja,
        workerDescription,
        skill,
        workExp,
      } = req.body;
      if (skill.length > 0) {
        skill.map(async (item) => {
          const skillId = uuidv4();
          await workerModel.addSkill(skillId, item, id);
        });
      }
      if (workExp.length > 0) {
        workExp.map(async (item) => {
          const workExpId = uuidv4();
          const { posisi, companyName, monthYear, workDescription } = item;
          await workerModel.addWorkExp(
            workExpId,
            id,
            posisi,
            companyName,
            monthYear,
            workDescription
          );
        });
      }
      await workerModel.workerUpdateData(
        id,
        jobdesk,
        domisli,
        tempatKerja,
        workerDescription
      );
      success(res, {
        code: 200,
        status: "success",
        message:
          "Update your profile, your skill, and your work experience success",
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
  workerSkill: async (req, res) => {
    try {
      const id = req.params.id;

      const data = await workerModel.workerSkillData(id);
      success(res, {
        code: 200,
        status: "success",
        message: "success get skill worker",
        data: data.rows,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: "Failed",
        message: "Failed to get worker's skill",
        error: error.message,
      });
      return;
    }
  },
  workerWorkExp: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await workerModel.workerWorkExpData(id);
      success(res, {
        code: 200,
        status: "success",
        message: "success get work Experience worker",
        data: data.rows,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: "Failed",
        message: "Failed to get worker's work experience",
        error: error.message,
      });
      return;
    }
  },
  workerPorto: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await workerModel.workerPortoData(id);
      success(res, {
        code: 200,
        status: "success",
        message: "success get Portofolio worker",
        data: data.rows,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: "Failed",
        message: "Failed to get worker's portofolio",
        error: error.message,
      });
      return;
    }
  },
};
