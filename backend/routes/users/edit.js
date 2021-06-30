const { Router } = require('express');
const router = Router();
const Users = require('../../models/Usuarios');
const Autentication = require('../../middlewares/Autentication');
const mdUsers = require('../../middlewares/Users');

const cors = require('cors')

router.put('/:usrLogin', Autentication.validateToken, mdUsers.userRol, async (req, res) => {
    
    const usr_login = req.body.usr_login;
    const usr_name = req.body.usr_name;
    const usr_surname = req.body.usr_surname;
    const usr_email = req.body.usr_email;
    const usr_admin_flag = req.body.usr_admin_flag;    
    const usr_password = req.body.usr_password;

    console.log(req.params.usrLogin)
    const editUser = await Users.usersModel.update({ usr_login: usr_login, usr_name: usr_name, usr_surname: usr_surname, usr_email: usr_email, usr_admin_flag: usr_admin_flag, usr_password: usr_password  }, { where: { usr_login: req.params.usrLogin } })
    .catch(err => throwException(err, res));

    res.status(201).json({
        message: 'User updated',
        editUser
    });
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