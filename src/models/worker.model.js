const db = require("../config/pg");

const workerModel = {
  allWorkerActive: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total FROM worker WHERE is_active=1`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  workerActiveData: (data) => {
    return new Promise((resolve, reject) => {
      const { searchQuery, offsetValue, limitValue, sortQuery, modeQuery } =
        data;
      db.query(
        `SELECT * FROM worker WHERE LOWER(name) LIKE LOWER ('%${searchQuery}%') AND is_active=1 ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  workerDetailData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM worker WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  workerGetImage: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT image FROM worker WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  workerUpdateImage: (image, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE worker SET image='${image}', updated_at=NOW()  WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  addSkill: (skillId, item, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO skill (id, worker_id, name) 
        VALUES ('${skillId}','${id}','${item}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  addWorkExp: (
    workExpId,
    id,
    posisi,
    companyName,
    monthYear,
    workDescription
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO work_exp (id, worker_id, posisi, company_name, month_year, work_description) 
        VALUES ('${workExpId}','${id}','${posisi}','${companyName}','${monthYear}-01','${workDescription}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  workerUpdateData: (id, jobdesk, domisli, tempatKerja, workerDescription) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE worker SET jobdesk='${jobdesk}',domisli='${domisli}',tempat_kerja='${tempatKerja}',worker_description='${workerDescription}', updated_at=NOW() WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  workerSkillData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM skill WHERE worker_id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  workerWorkExpData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT *,to_char(work_exp.month_year,'Mon, YYYY') AS month_yearFix FROM work_exp WHERE worker_id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  workerData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM portofolio WHERE worker_id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
};

module.exports = workerModel;
