const { Router } = require('express');
const router = Router();
const db = require("../../database/dbConnector");


const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const { QueryTypes } = require("sequelize");
/*const mdUsers = require('../../middlewares/mdUsers');
const mdGlobal = require('../../middlewares/mdGlobal');*/
const Users = require('../../models/Usuarios');


router.post('/', /*mdGlobal.checkEmptyBody, mdUsers.requireDataSendend,*/ async (req, res) => {
    const {username, password} = req.body;

    const userFound = await Users.usersModel.findOne({
        where: { usr_login: username, usr_password: password }
    }).catch(err => catchDatabaseEror(err, res));

    if(!userFound) {
        res.status(404).json({
            message: 'Username or password invalid.'
        });
    } else {
        res.locals.userLogged = userFound;
        const token = await JWT.sign({ usr_id: userFound.usr_id, usr_name: userFound.usr_full_name, admin: userFound.usr_admin_flag }, JWTSign);

        res.status(200).json({
            message: 'Successfully logged in.',
            token
        });
    }
});

module.exports = router