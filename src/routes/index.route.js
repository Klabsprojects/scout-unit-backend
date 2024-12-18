const app = require('express')();
require("./login/login.route")(app);
require("./school-form/school-form.route")(app);
// require("./allocate-form/allocate-form.route")(app);
module.exports = app;