const { Router } = require('express');
const router = Router();
const Users = require('../../models/Usuarios');
/*const mdUsers = require('../../middlewares/mdUsers');
const mdGlobal = require('../../middlewares/mdGlobal');
*/
const cors = require('cors')

router.post('/', /*mdGlobal.checkEmptyBody, mdUsers.checkRequiredData, mdUsers.isDataValid,*/ async (req, res) => {
    const userData = req.body;
    
    const newUser = await Users.usersModel.create(userData)
    .catch(err => {
        console.log('Unable to create user.');
        res.status(500).json({
            message: 'There was a problem with the database.',
            error: err
        });
    });

    res.status(201).json({
        message: 'User created.',
        newUser
    });
});

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
router.use(cors());


module.exports = router