module.exports = (app) => {
    const value = require("../../controllers/login/login.controller");
    const { joi, cache } = require("../../helpers/index.helper");
    const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
    app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.post(
  //   "/register",
  //   value.loginRegister
  // );

  // app.route("/login")
  //   .post(value.login)

  //   app.get(
  //     "/getLoginUserTypes",
  //     value.getAllUserTypes
  //   )

  //   app.get(
  //     "/getUserNamesByUserType",
  //     value.getUserNamesByUserType
  //   )

     app.post(
      "/addDistricts",
      // [jwt.verifyToken],
      value.addDistricts
    );

    app.get(
      "/getDistricts",
      value.getDistricts
    )

    app.post(
      "/addSubDistricts",
      // [jwt.verifyToken],
      value.addSubDistricts
    );

    app.get(
      "/getSubDistricts",
      value.getSubDistricts
    )

    app.post(
      "/loginRegister",
      value.loginRegister
    );

    app.post(
      "/login",
      value.login
    );

}