const { success, failed } = require("../helpers/response");
const workExpModel = require("../models/workExp.model");

module.exports = {
  workExpdelete: async (req, res) => {
    try {
      const id = req.params.id;
      // const workerId = req.APP_DATA.tokenDecoded.workerid;
      const workExpDelete = await workExpModel.workExpDeleteData(id);
      if (workExpDelete.rowCount === 0) {
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
        data: workExpDelete.rows[0],
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
