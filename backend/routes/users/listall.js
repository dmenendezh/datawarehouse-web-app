const { Router } = require('express');
const router = Router();
const Users = require('../../models/Usuarios');
/*const mdGlobal = require('../../middlewares/mdGlobal');
const mdUsers = require('../../middlewares/mdUsers');*/
const cors = require('cors')

router.get('/',  /*mdGlobal.validateToken, mdUsers.userRol,*/ async (req, res) => {
    const usr = await Users.usersModel.findAll({ where: {}})
    .catch(err => throwException(err, res));

    res.status(200).json({
        message: 'Returning all users.',
        quantity: usr.length,
        usr
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

module.exports = router