const db = require("../../../utils/sequelize.db");
const commonService = require("../../services/commonService");
const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
const { successRes, errorRes } = require("../../middlewares/response.middleware")
const { Login } = require("../../models/login/login.model")
const { Sequelize } = require('sequelize');
//const { Op } = require('sequelize'); // Import Sequelize operators

const bcrypt = require('bcryptjs');
const { where } = require("sequelize");

let file = "schoolform.controller";
let Jkey = process.env.JWT_SECRET_KEY;

exports.register = async (req, res) => {
    try {
        console.log('try register');
        console.log(req.body);
        let query = req.body;
        const results = await commonService.insertOne(db.schoolform, query);
        console.log(results);
        successRes(res, results, SUCCESS.CREATED);
    } catch (error) {
        console.log('catch', error);
        const message = error.message ? error.message : ERRORS.LISTED;
        errorRes(res, error, message, file);
    }
    }