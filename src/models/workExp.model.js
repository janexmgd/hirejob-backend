const db = require("../config/pg");

const workerExpModel = {
  workExpDeleteData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM work_exp WHERE id ='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = workerExpModel;
