const { Router } = require('express');
const router = Router();
const Users = require('../../models/Usuarios');
const Autentication = require('../../middlewares/Autentication');
const mdUsers = require('../../middlewares/Users');

const cors = require('cors');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/:nombre',  Autentication.validateToken, mdUsers.userRol, async (req, res) => {
    const nomb = req.params.nombre;
    let usr = '';
    if(nomb == ''){
        
        usr = await Users.usersModel.findAll({ where: {}})
        .catch(err => throwException(err, res));        
    }else{
        usr = await Users.usersModel.findAll({ where: { 
            usr_name: {
                [Op.like]: '' + nomb + '%'
              }
        }})
        .catch(err => throwException(err, res));

        if(usr == ''){
            usr = await Users.usersModel.findAll({ where: { 
                usr_login: {
                    [Op.like]: '' + nomb + '%'
                  }
            }})
            .catch(err => throwException(err, res));
        }
    }

    res.status(200).json({
        message: 'Returning some users',       
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