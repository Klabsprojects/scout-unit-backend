const db = require("../../../utils/sequelize.db");
const commonService = require("../../services/commonService");
const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
const { successRes, errorRes } = require("../../middlewares/response.middleware")
const axios = require('axios');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize'); 

let file = "login.controller";
let Jkey = process.env.JWT_SECRET_KEY;
 
exports.addDistricts = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);
        let distId;
        let name; 
        let inputQuery;
        distId = req.body.distId;
        name = req.body.name;
        inputQuery = { distId: distId, name: name };
        console.log('inputQuery', inputQuery);
        const login = new db.district(inputQuery);
        await login.save();
        res.status(201).json({ message: 'District registered successfully' });
    } catch (error) {
        console.log('catch', error);
        if(error.name == 'SequelizeUniqueConstraintError'){
            res.status(500).json({ error: 'District already registered' });
        }
        else
            res.status(500).json({ error: 'District Registration failed' });
    }
    }

exports.getDistricts = async (req, res) => {
  try {
    let where = {}
    const districts = await db.district.findAll();
    successRes(res, districts, SUCCESS.LISTED);
  } catch (error) {
    console.error('Error fetching districts:', error);
    const message = error.message ? error.message : ERRORS.LISTED;
    errorRes(res, error, message, file);
  }
};

exports.addSubDistricts = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);
        let subDistId;
        let name; 
        let inputQuery, districtId;
        if(req.body.subDistId && req.body.name && req.body.districtId){
            subDistId = req.body.subDistId;
            name = req.body.name;
            districtId = req.body.districtId;
            inputQuery = { subDistId: subDistId, name: name, districtId: districtId };
            console.log('inputQuery', inputQuery);
            const login = new db.subdistrict(inputQuery);
            await login.save();
            res.status(201).json({ message: 'District registered successfully' });
        }
        else   
            throw 'Pls provide valid inputs';
        
    } catch (error) {
        console.log('catch', error);
        if(error.name == 'SequelizeUniqueConstraintError'){
            res.status(500).json({ error: 'District already registered' });
        }
        else
            res.status(500).json({ error: 'District Registration failed' });
    }
    }

exports.getSubDistricts = async (req, res) => {
    try {
      let inputQuery = {}
      if(req.query.districtId){
        inputQuery.where = {
            districtId: req.query.districtId
        }
        const districts = await db.subdistrict.findAll(inputQuery);
        successRes(res, districts, SUCCESS.LISTED);
      }
      else
        throw 'pls provide valid district id';
    } catch (error) {
      console.error('Error fetching subdistricts:', error);
      const message = error.message ? error.message : ERRORS.LISTED;
      errorRes(res, error, message, file);
    }
  };
  

exports.loginRegister = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);
        let userType;
        let userName; 
        let password; 
        let districtId;
        let subDistrictId;
        let inputQuery;
        userType = req.body.userType;
        userName = req.body.userName;
        password = req.body.password;
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(password);
        console.log(hashedPassword);
        if(req.body.districtId && req.body.subDistrictId && req.body.userType && req.body.userType == 'District'){
          //districtId = req.body.distId;
            districtId = req.body.districtId;
            subDistrictId = req.body.subDistrictId;
          inputQuery = { userType: userType, 
            userName: userName, 
            password: hashedPassword, 
            districtId: districtId,
            subDistrictId: subDistrictId
        };
          console.log('inputQuery', inputQuery);
        }
        else if(req.body.userType && req.body.userType == 'Admin')
        {
          inputQuery = { userType: userType, userName: userName, password: hashedPassword};
          console.log('inputQuery', inputQuery);
        }
        else 
            throw 'Pls provide valid inputs';
        const login = new db.login(inputQuery);
        await login.save();
        res.status(201).json({ message: 'Login registered successfully' });
    } catch (error) {
        console.log('catch', error);
        if(error.name == 'SequelizeUniqueConstraintError'){
            res.status(500).json({ error: 'UserName already registered' });
        }
        else
            res.status(500).json({ error: 'Login Registration failed' });
    }
}

exports.login = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);
        let query = {};
        if(req.body.userType && req.body.userType == 'Admin'){
            query.where = {
                userType: req.body.userType,
                userName: req.body.userName
            };
            console.log('query ', query);
        }
        else if(req.body.userType && req.body.userType == 'District' && 
            req.body.districtId && req.body.subDistrictId)
        {
            query.where = {
                userType: req.body.userType,
                userName: req.body.userName,
                districtId: req.body.districtId,
                subDistrictId: req.body.subDistrictId,
            };
            console.log('query ', query); 
        }
        else
            throw 'Pls provide valid inputs';
        let user;
        if (req.body.userType && req.body.userName && req.body.password) {
            console.log('if');
            user = await commonService.findOne(db.login, query);
            console.log(user);
        }
        console.log('User ', user);
        if (!user) {
        return res.status(401).json({ error: 'User Not Found' });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        console.log(passwordMatch);
        if (!passwordMatch) {
            console.log('Password didnt matched');
            return res.status(401).json({ error: 'Password Wrong' });
        }
        let jwt_input = {
            userName: req.query.userName,
            password: req.query.password
        }
        const expire = process.env.EXPIRE;
        const token = await jwt.createToken(jwt_input, expire);
        const output = {
            data: user,
            token: token,
        }
        console.log('output : ', output);
        res.status(200).json({output});
    } catch (error) {
        console.log('catch', error);
        res.status(500).json({ error: 'Login failed' });
    }
}

      