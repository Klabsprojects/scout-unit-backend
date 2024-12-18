module.exports = (app) => {
    const value = require("../../controllers/school-form/school-form.controller");
    const { joi, cache } = require("../../helpers/index.helper");
    const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
    const upload = require("../../middlewares/upload")
    app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/registerSchool",
    [jwt.verifyToken],
    value.register
  );

  app.get(
    "/getAllSchoolForms",
    [jwt.verifyToken],
    value.getAllSchoolForms
  )

}