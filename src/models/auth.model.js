const db = require("../config/pg");

const authModel = {
  recruiterNameCheck: (name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recruiter WHERE name='${name}'`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  nameCheck: (name) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM worker WHERE name='${name}'`, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    });
  },
  emailCheck: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM auth WHERE email='${email}'`, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    });
  },
  registerAuth: (data) => {
    return new Promise((resolve, reject) => {
      const { authid, email, passwordHashed, verifyToken, isVerified, level } =
        data;
      console.log(data);
      db.query(
        `INSERT INTO auth(id,email,level,verify_code,is_verified,password)
        VALUES('${authid}','${email}',${level},'${verifyToken}','${isVerified}','${passwordHashed}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        }
      );
    });
  },
  registerRecruiterData: (data) => {
    return new Promise((resolve, reject) => {
      const {
        recruiterId,
        name,
        companyName,
        position,
        phone,
        image,
        authid,
        isActive,
      } = data;
      db.query(
        `INSERT INTO recruiter(id,name,company_name,position,phone,image,auth_id,is_active)
        VALUES('${recruiterId}','${name}','${companyName}','${position}','${phone}','${image}','${authid}',${isActive})`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  registerWorker: (data) => {
    return new Promise((resolve, reject) => {
      const { workerid, name, phone, image, authid, isActive } = data;
      db.query(
        `INSERT INTO worker(id,name,phone,image,auth_id,is_active)
        VALUES('${workerid}','${name}','${phone}','${image}','${authid}','${isActive}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  verifyTokenCheck: (verifyToken) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM auth WHERE verify_code='${verifyToken}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        }
      );
    });
  },
  verifyingUser: (verifyToken) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE auth SET is_verified=1, verify_code=null WHERE verify_code='${verifyToken}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  activeCheck: (authId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM worker WHERE auth_id='${authId}'`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  recruiterActiveCheck: (authId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recruiter WHERE auth_id='${authId}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  authWorkerData: (authId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT auth.id AS authId, auth.email AS email, auth.password AS password, auth.level, auth.verify_code, worker.id AS workerId, worker.name,worker.image,worker.jobdesk,worker.domisli,worker.tempat_kerja, worker.worker_description,worker.auth_id,worker.phone,worker.is_active
       FROM auth INNER JOIN worker ON auth.id = worker.auth_id WHERE auth.id='${authId}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  authRecruiterData: (authId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT auth.id AS authId, auth.email AS email, auth.password AS password, auth.level, auth.verify_code,
        recruiter.id AS recruiterId, recruiter.company_name , recruiter.position, recruiter.phone, recruiter.company_field, recruiter.kota, recruiter.instagram,
        recruiter.linkedin, recruiter.company_description, recruiter.auth_id, recruiter.is_active, recruiter.image
        FROM auth INNER JOIN recruiter ON auth.id = recruiter.auth_id WHERE auth.id='${authId}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = authModel;
