const { check } = require("express-validator");
const portoInsert = [
  // app_name
  check("appName", "App name cannot be empty").not().isEmpty(),
  // link_repo
  check("linkRepo", "Repo link cannot be empty").not().isEmpty(),
  // type
  check("type", "type cannot be empty").not().isEmpty(),
  check("type", "type value must be between 0 to 1").isInt({
    min: 0,
    max: 1,
  }),
];
module.exports = {
  portoInsert,
};
