const { Router } = require('express');
const router = Router();
const Users = require('../../models/Usuarios');
const db = require("../../database/dbConnector");
const Autentication = require('../../middlewares/Autentication');
const mdUsers = require('../../middlewares/Users');
const cors = require('cors')

router.delete('/:usrLogin', Autentication.validateToken, mdUsers.userRol, async (req, res) => {
    try{
        console.log("user a borrar= " + req.params.usrLogin);

        const UserDel = await Users.usersModel
        .destroy({ where: { usr_login: req.params.usrLogin } })
        .catch(err => throwException(err, res));


        res.status(201).json({
            message: 'User deleted',
            UserDel
        });
    }catch(err){
        console.log(err.message);
        throwException(err, res);
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

module.exports = router;