const db = require("../config/pg");

const recruiterModel = {
	recruiterDetailData: (id) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM recruiter WHERE id='${id}'`, (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		});
	},
	recruiterUpdateData: (
		id,
		name,
		phone,
		companyName,
		position,
		companyField,
		kota,
		instagram,
		linkedin,
		companyDescription
	) => {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE recruiter SET name='${name}', phone='${phone}',
        company_name='${companyName}', position='${position}',
        company_field='${companyField}', kota='${kota}', instagram='${instagram}',
        linkedin='${linkedin}',company_description='${companyDescription}', updated_at=NOW() WHERE id='${id}'`,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	recruiterGetImage: (id) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT image FROM recruiter WHERE id='${id}'`,
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
	recruiterUpdateImage: (image, id) => {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE recruiter SET image='${image}', updated_at=NOW()  WHERE id='${id}'`,
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
};
module.exports = recruiterModel;
