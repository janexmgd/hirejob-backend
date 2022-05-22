const db = require("../config/pg");

const portofolioModel = {
  portofolioInsert: (id, appName, workerId, linkRepo, type, image) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO portofolio(id,worker_id,app_name,repo_link,type,image)
        VALUES('${id}','${workerId}','${appName}','${linkRepo}','${type}','${image}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  portofolioDetailData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portofolio WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  portofolioDeleteData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM portofolio WHERE id ='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = portofolioModel;
