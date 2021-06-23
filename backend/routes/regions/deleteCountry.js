const { Router } = require('express');
const router = Router();
const Country = require('../../models/Countrys');
const cors = require('cors')

router.delete('/:countryname', /*mdGlobal.validateToken, mdUsers.userRol,*/ async (req, res) => {
    try{
        const rst = await Country.countryModel
        .destroy({ where: { country_name: req.params.countryname } })
        .catch(err => throwException(err, res));

        res.status(201).json({
            message: 'Country deleted',
            rst
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