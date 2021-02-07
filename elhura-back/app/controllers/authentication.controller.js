require('dotenv').config()
const db = require("../models");
const Client = db.Client;
const Company = db.Company;
const Admin = db.Admin;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/db.config');

const clientController = require("./client.controller.js");
const adminController = require("./admin.controller.js");
const companyController = require("./company.controller.js");

const userService = require('../services/user');
const authService = require('../services/auth');

exports.checkIfUserExists = async (req, res) => {
    res.cookie('email', req.body.email, { httpOnly : true, maxAge : 2*3600*1000 });

    const user = await userService.checkIfUserExistsBy("email", req.body.email, -1);

    let number = user.length;

    if(number === 0) {
        res.cookie('canMakeRegisterChoice', true, { httpOnly : true, maxAge : 2*3600*1000 });
    }

    res.send({
        userExists : number !== 0
    })
}

// Register a new User
exports.register = (req, res) => {
    // Get the important field
    const { idRole } = req.body;

    // Hash the password with bcrypt
    const hashedPassword = bcrypt.hashSync(req.body.password, 8); 
    req.body.password = hashedPassword;
    switch(idRole)
    {
        case 0:
            adminController.create(req,res);
            break;
        case 1:
            clientController.create(req,res)
            break;
        case 2:
            companyController.create(req,res)
            break;
        default:
            return res.json({
                message : 'Server Error'
            })
    }   

};

exports.validate = (req, res) => {
    const access_token = req.cookies.access_token;
    const code = req.body.code;

    if(access_token == null || code == null) return res.sendStatus(401)

    jwt.verify(access_token,process.env.ACCESS_TOKEN_SECRET,async (err,user)=>{
        if (user !== undefined) {
            let fetchedUser = await userService.checkIfUserExistsBy("idUser", user.id, user.idRole);
            if (fetchedUser.length === 0){
                return res.json({
                    message : 'User doesn\'t exist'
                });
            }
            if (fetchedUser.length > 1){
                return res.json({
                    message : 'Too many rows fetched'
                });
            }

            const { access_token, refresh_token } = authService.generateToken(user.id, user.idRole);

            userService.updateField('isValid', true, user.id);

            res.cookie('refresh_token', refresh_token, { httpOnly : true, maxAge : 2*3600*1000 });
            res.clearCookie('canConfirmRegister');

            res.send({
                auth: code===fetchedUser[0].validationCode
            })
        }
        if(err) return res.sendStatus(403)
        req.user = user
    })
}

// Authenticate a new User
exports.login = async (req, res) => {
    let user;

    // Check if the user exist using the mail and use bcrypt to compare the pwd
     user = await Client.findAll({ where :{
        email : req.body.email
    }})
    if(user.length === 0)
    {
        user = await Company.findAll({ where :{
            email : req.body.email
        }})
        if(user.length === 0)
        {
            user = await Admin.findAll({ where :{
                idUser : req.body.idUser
            }})
            if(user.length === 0)
           {
               res.json(404).send({
                   message:'User Not Found'
               })
           }
        }
        
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password,  user[0].password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // create a token witth jwt.sign and using a secret key
    const { access_token, refresh_token } = authService.generateToken(user[0].idUser, user[0].idRole);

    res.cookie('access_token', access_token, { httpOnly : true, maxAge : 3600*1000 });
    res.cookie('refresh_token', refresh_token, { httpOnly : true, maxAge : 2*3600*1000 });

    // Return the token
    res.status(200).send({ auth: true });
};

// Log Out a new User
exports.logout = (req, res) => {
   
};

// check the validity of the token after each request
exports.isAuthenticated = async (req, res) => {
    const userExists = await userService.checkIfUserExistsBy("email", req.cookies.email, -1);

    let number = userExists.length;

    if(number === 0) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.send({
            auth: false
        })
    } else{
        const refresh_token = req.cookies.refresh_token;
        const access_token = req.cookies.access_token;
        if(access_token == null || refresh_token == null) return res.sendStatus(401)

        jwt.verify(access_token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if (user !== undefined) {
                res.send({
                    auth: true
                })
            }
            if(err) {
                jwt.verify(refresh_token,process.env.REFRESH_TOKEN_ACCESS,(refresh_err, refresh_user)=>{
                    if(refresh_user !== undefined) {
                        const access_token = authService.refreshToken(refresh_user.id, refresh_user.idRole);
                        res.cookie('access_token', access_token, { httpOnly : true, maxAge : 3600*1000 });

                        res.send({
                            auth: true
                        })
                    }
                    if(refresh_err) return res.sendStatus(403)
                });
            }
            req.user = user;
        });
    }
};

exports.canPassToNextRegisterSteps = async (req, res) => {
    let resp = false;
    console.log("Hello");
    if (req.cookies.email !== undefined) {
        console.log(req.cookies.email);
        userExists = await userService.checkIfUserExistsBy("email", req.cookies.email, -1);
        console.log("Mike", userExists);
        if (userExists.length !== 0) {
            console.log(userExists[0].isValid);
            resp = !userExists[0].isValid;
        }else{
            resp = false;
        }
    }

    res.send({
        flag : resp
    })
};

exports.canMakeRegisterChoice = async (req, res) => {
    let resp = false;

    if ( req.cookies.canMakeRegisterChoice !== undefined ) {
        resp = true;
    }

    res.send({
        flag : resp
    })
};

exports.canConfirmRegister = async (req, res) => {
    let resp = false;

    if ( req.cookies.canConfirmRegister !== undefined ) {
        resp = true;
    }

    res.send({
        flag : resp
    })
};
