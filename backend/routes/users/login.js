const { Router } = require('express');
const router = Router();
const db = require("../../database/dbConnector");
const cors = require('cors')


const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const { QueryTypes } = require("sequelize");
/*const mdUsers = require('../../middlewares/mdUsers');
const mdGlobal = require('../../middlewares/mdGlobal');*/
const Users = require('../../models/Usuarios');


router.post('/',/*mdGlobal.checkEmptyBody, mdUsers.requireDataSendend,*/ async (req, res) => {
    const {usrmail, password} = req.body;

    console.log(usrmail);
    console.log(password);
    const userFound = await Users.usersModel.findOne({
        where: { usr_email: usrmail, usr_password: password }
    }).catch(err => throwException(err, res));

    if(!userFound) {
        res.status(404).json({
            message: 'Username or password invalid.'
        });
    } else {
        res.locals.userLogged = userFound;
        const token = await JWT.sign({ usr_id: userFound.usr_id, usr_login: userFound.usr_login, usr_name: userFound.usr_name, usr_surname: userFound.usr_surname, admin: userFound.usr_admin_flag }, JWTSign);

        res.status(200).json({
            message: 'Successfully logged in.',
            token
        });
    }
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
router.use(cors());


module.exports = router