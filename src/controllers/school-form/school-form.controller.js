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

exports.getAllSchoolForms = async (req, res) => {
  try {
        const { fromDate, toDate, paymentStatus, districtId } = req.query;
        console.log(fromDate, toDate, paymentStatus, districtId);
        const startDate = fromDate ? new Date(fromDate) : null;
        const endDate = toDate ? new Date(toDate) : null;
        console.log(startDate, endDate);
        let where = {}
    
        if(startDate && endDate){
          console.log('date coming ', startDate, endDate);
          where.createdAt = {
              [Op.between]: [startDate, endDate]
            }
        }
        if(paymentStatus){
          console.log('status coming ', paymentStatus);
          where.paymentStatus = paymentStatus;
        }
        // Filter by section if provided
        if (districtId) {
          console.log('section coming ', districtId);
          where.districtId = districtId;
        }
        // Fetch all posts
        const schoolforms = await db.schoolform.findAll({
          include: [
            {
                model: db.login, // Include the Login model
                as: 'byLogin', // Alias used in the association
                required: false, 
                attributes: ['userName', 'userType', 'id', 'districtId'], // Only select relevant fields
            },
            {
              model: db.district, // Include the Login model
              as: 'byDistrict', // Alias used in the association
              required: false, 
              attributes: ['name', 'distId', 'id'], // Only select relevant fields
          },
          ],
          order: [['createdAt', 'DESC']], // Optionally, order by upload date
          where: where
        });
        successRes(res, schoolforms, SUCCESS.LISTED);
      } catch (error) {
        console.error('Error fetching schoolforms:', error);
        const message = error.message ? error.message : ERRORS.LISTED;
        errorRes(res, error, message, file);
      }
};